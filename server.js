// Imports
const fs = require("fs");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const base64 = require("byte-base64");
const textToSpeech = require("@google-cloud/text-to-speech");
const wav = require("wav");

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

const app = require("./app");

// Start server
const expressServer = app.listen(port, () =>
  console.log(`Cheer server running on port ${port}`)
);

// Start socket.io server
const io = socketio(expressServer);

const askGoogle = async (request) => {
  const client = new textToSpeech.TextToSpeechClient();
  try {
    const [response1] = await client.synthesizeSpeech(request);

    return response1;
  } catch (error) {
    console.error(error);
  }
};

io.of("/audio").on("connect", (socket) => {
  console.log("connected");

  socket.on("sendGoogleVoice", async (info) => {
    console.log("got request");

    const request = {
      input: { text: "I believe in you, I hope you know that" },
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "LINEAR16", sampleRateHertz: 16000 },
    };

    const response = await askGoogle(request);

    socket.emit("receiveAudio", base64.bytesToBase64(response.audioContent));
  });
});
