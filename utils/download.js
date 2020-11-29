const fs = require("fs");
const { promisify } = require("util");

const textToSpeech = require("@google-cloud/text-to-speech");

const downloadSpeech = async () => {
  const client = new textToSpeech.v1beta1.TextToSpeechClient();

  const request = {
    input: {
      ssml: `<speak><prosody rate="90%">Pain</prosody></speak>`,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
    },
    audioConfig: {
      audioEncoding: "LINEAR16",
      effectsProfileId: ["large-home-entertainment-class-device"],
      // sampleRateHertz: 96000,
      volumeGainDb: 4,
      pitch: -2.5,
    },
  };
  try {
    const [response] = await client.synthesizeSpeech(request);

    fs.writeFileSync(`${__dirname}/../speech/file.wav`, response.audioContent);
    console.log("Download completed");
  } catch (error) {
    console.error(error);
  }
};

downloadSpeech();
