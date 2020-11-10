const fs = require("fs");
const Stream = require("stream");
const { promisify } = require("util");
const _ = require("lodash");

// const es = require("event-stream");
const textToSpeech = require("@google-cloud/text-to-speech");
const {
  startingVoice,
  sessionVoice,
  heroBank,
  riseBank,
} = require("../utils/phraseBank");
const { streaming, streamingVoice } = require("../utils/factory");

const durationToBytes = (duration = 60, bitrate = 320) => {
  // Converts duration of song to size in bytes
  // Duration in seconds, bitrate in kbps
  return ((duration * bitrate) / 8) * 1024;
};

const googleResponse = async (request) => {
  const client = new textToSpeech.TextToSpeechClient();
  try {
    const [response] = await client.synthesizeSpeech(request);

    return response;
  } catch (error) {
    console.error(error);
  }
};

exports.getBackgroundAudio = async (req, res, next) => {
  let { name } = req.query;
  // let path;
  // let mime;

  // const randomSongNum = _.random(1, 4, false);

  // path = `${__dirname}/../music/${genre}${randomSongNum}.opus`
  // path = `${__dirname}/../music/hero4.opus`
  mime = "audio/opus";

  const path = `${__dirname}/../music/${name}.opus`;

  try {
    await streaming(req, res, path, mime);
    // fs.createReadStream(path).pipe(res);
    console.log("SENT OGG SUCCESSFULLY");
  } catch (error) {
    console.error(error);
  }
};

// exports.testMP3 = async (req, res, next) => {
//   const ssml = `<speak>
//     <prosody pitch="-1st">No power is out of your reach,<break time="400ms"/> <prosody pitch="-2st"> but you must work for it</prosody></prosody>
//     </speak>`;

//   const request = {
//     input: {
//       ssml,
//     },
//     voice: {
//       languageCode: "en-US",
//       name: "en-US-Wavenet-D",
//     },
//     audioConfig: {
//       // audioEncoding: "MP3",
//       audioEncoding: "OGG_OPUS",
//       effectsProfileId: ["large-automotive-class-device"],
//       // sampleRateHertz: 96000,
//       volumeGainDb: 8,
//       pitch: -2.5,
//     },
//   };

//   try {
//     const response = await googleResponse(request);

//     // console.log(response.audioContent.toString());
//     // const binaryResponse = base64.base64ToBytes(response.audioContent);

//     const readableStream = new Stream.Readable();

//     // readableStream.push(binaryResponse);
//     readableStream.push(response.audioContent);
//     readableStream.push(null);
//     readableStream.pipe(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.getGoogleVoice = async (req, res, next) => {
  let ssmlArr;
  const { firstName, firstVoice, genre } = req.query;

  if (firstVoice) {
    ssmlArr = startingVoice(firstName);
  } else if (genre === "hero") {
    ssmlArr = heroBank(firstName);
  } else if (genre === "rise") {
    ssmlArr = riseBank(firstName);
  }
  // Random statement
  const ssml = ssmlArr[_.random(0, ssmlArr.length - 1, false)];
  //   const ssml = `<speak>
  //   <prosody rate=\"120%\">Welcome Adam. Let's not waste any time</prosody>
  // </speak>`;

  console.log(ssml);

  const request = {
    input: {
      ssml,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
    },
    audioConfig: {
      // audioEncoding: "MP3",
      audioEncoding: "OGG_OPUS",
      // effectsProfileId: ["headphone-class-device"],
      effectsProfileId: ["large-home-entertainment-class-device"],
      // sampleRateHertz: 96000,
      volumeGainDb: 4,
      pitch: -2.5,
    },
  };

  try {
    const response = await googleResponse(request);
    // await streamingVoice(req, res, response.audioContent, "audio/opus", true);

    const readableStream = new Stream.Readable();

    readableStream.push(response.audioContent);
    readableStream.push(null);
    readableStream.pipe(res);
  } catch (error) {
    console.error(error);
  }
};

exports.getSoundEffect = async (req, res, next) => {
  const { name } = req.query;
  const path = `${__dirname}/../sounds/${name}.opus`;

  try {
    await streaming(req, res, path, "audio/opus");
  } catch (error) {
    console.log(error);
  }
};
