const { createServer } = require('http');
const express = require('express');
const { WebSocketServer } = require('ws');
const WebSocket = require('ws');
require('dotenv').config();

const PORT = 8080;
const AAI_URL = 'wss://streaming.assemblyai.com/v3/ws';
const AAI_QUERY = new URLSearchParams({
  encoding:'pcm_mulaw',  
  sample_rate: 8000,
  format_turns: true
}).toString();

const MIN_BYTES = 480; // 60 ms @ 8-kHz µ-law

const silent = buf => buf.every(b => b === 0xFF);

startServer();

function startServer () {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  app.post('/', (req, res) => res.type('xml').send(`
    <Response>
      <Connect><Stream url="wss://${req.headers.host}" /></Connect>
    </Response>`));

  wss.on('connection', handleCall);

  server.listen(PORT, () =>
    console.log(`Listening on ${PORT}`));
}

function handleCall (twilioWS) {
  const aaiWS = new WebSocket(`${AAI_URL}?${AAI_QUERY}`, {
    headers: { Authorization: process.env.ASSEMBLYAI_API_KEY }
  });

  let buf = Buffer.alloc(0);
  let aaiReady = false;

  aaiWS.on('open', () => { aaiReady = true; });
  aaiWS.on('message', d => {
    const m = JSON.parse(d);
    if (m.type === 'Turn' && m.transcript) console.log(m.transcript);
  });
  aaiWS.on('error',  console.error);
  aaiWS.on('close',  () => twilioWS.close());

  twilioWS.on('message', raw => {
    const msg = JSON.parse(raw);
    if (msg.event !== 'media') {
      if (msg.event === 'stop') twilioWS.close();
      return;
    }

    const ulaw = Buffer.from(msg.media.payload, 'base64');
    if (!aaiReady && silent(ulaw)) return;    // wait for speech

    buf = Buffer.concat([buf, ulaw]);
    if (!aaiReady || buf.length < MIN_BYTES) return;

    try { aaiWS.send(buf); } catch (e) { console.error(e); }
    buf = Buffer.alloc(0);
  });

  /* graceful shutdown */
  twilioWS.on('close', () => {
    if (aaiReady && buf.length >= MIN_BYTES) {
      try { aaiWS.send(buf); } catch {}
    }
    if (aaiReady) aaiWS.send(JSON.stringify({ type:'Terminate' }));
    aaiWS.close();
  });

  twilioWS.on('error', console.error);
}
