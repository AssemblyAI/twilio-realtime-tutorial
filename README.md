# AssemblyAI's JavaScript SDK & Twilio Real-Time Tutorial

This repo provided by AssemblyAI displays how to use our JavaScript SDK with Twilio to transcribe calls in real-time.

## How To Install and Run the Project

### ❗Important❗

- Before running this app, you need to upgrade your AssemblyAI account. The real-time API is only available to upgraded accounts at this time.
- Running the app before upgrading will cause an **error with a 402 status code.** ⚠️
- To upgrade your account you need to add a card. You can do that in your [dashboard](https://www.assemblyai.com/app/)!
- You will need to set up a a [Twilio](https://login.twilio.com/u/signup?state=hKFo2SBRczN4Y3pmdnpoaVdxMlJtcXU1eVV1NFFvQVQ2Q2tQUaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIE9PbmFBcThXcmkydVZINkVsaHNRclVxaGdNVE9PNUlso2NpZNkgTW05M1lTTDVSclpmNzdobUlKZFI3QktZYjZPOXV1cks) account and then install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart?ref=assemblyai.com).
- You will also need to create an [ngrok](https://ngrok.com) account and install it in your computer. Once you create an account there will be instructions to follow on your dashboard for installation.

### Instructions

1. Clone the repo to your local machine.
2. Open a terminal in the main directory housing the project. In this case `transcribe.js`.
3. Run `npm install` to ensure all dependencies are installed.
4. Add a `.env` file. Add your AssemblyAI key to the `.env` file. You can find your API key on the "Account" page in your [dashboard](https://www.assemblyai.com/app/account). Copy and paste it into the `.env` file replacing "YOUR-PERSONAL-API-KEY" with your own key: `ASSEMBLYAI_API_KEY=YOUR-PERSONAL-API-KEY`
5. In your terminal, run `ngrok http 8080`. You will then see a Forwarding url that points to your local host. You will need this in the next step.
6. Leave `ngrok` running and open up a new terminal. To tell Twilio what the routing address for your Twilio number is, use the following code: `twilio phone-numbers:update $TWILIO_NUMBER --voice-url $NGROK_HTTP_URL`. Where `$TWILIO_NUMBER` has been replaced with your Twilio number that you can find in the Twilio console and `$NGROK_HTTP_URL` has been replaced with the ngrok forwarding URL that you got in the previous step.
7. Start the app with the command `node transcribe.js`.
8. Call the Twilio number and follow the verbal instructions to start the stream. Once stream begins any spoken words will be transcribed in the terminal.

## Additional Tutorials

- [Transcribe Twilio Phone Calls in Real-Time with AssemblyAI blog post](https://www.assemblyai.com/blog/transcribe-twilio-phone-calls-in-real-time-with-assemblyai/)
- [Transcribe Twilio Phone Calls in Real-Time with AssemblyAI | JavaScript WebSockets Video Tutorial](https://www.youtube.com/watch?v=3XmtJgWcOT0)

## Further Documentation

- [AssemblyAI Real-Time Docs](https://www.assemblyai.com/docs/speech-to-text/streaming)
- [Twilio Voice Stream Docs](https://www.twilio.com/docs/voice/twiml/stream#websocket-messages)
- [ws](https://www.npmjs.com/package/ws)
- [Express](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Contact Us

If you have any questions, please feel free to reach out to our Support team - <support@assemblyai.com>!
