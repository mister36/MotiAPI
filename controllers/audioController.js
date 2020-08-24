const fs = require("fs");
const Stream = require("stream");
const { promisify } = require("util");
const _ = require("lodash");

// const es = require("event-stream");
const textToSpeech = require("@google-cloud/text-to-speech");
const { startingVoice, sessionVoice } = require("../utils/phraseBank");
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
  let path;
  let mime;

  // Music files sorted by file extensions
  const webmArr = [2, 3, 4];
  const m4aArr = [1];

  const randomSongNum = _.random(1, 4, false);

  if (webmArr.includes(randomSongNum)) {
    path = `${__dirname}/../music/song${randomSongNum}.webm`;
    mime = "video/webm";
  } else if (m4aArr.includes(randomSongNum)) {
    path = `${__dirname}/../music/song${randomSongNum}.m4a`;
    mime = "audio/mp4";
  }

  // stream.on("error", () => console.log("stream error"));
  // stream.end();
  // res.end();

  // const stream = fs.createReadStream(path);
  // res.setHeader("Content-Type", mime);
  // stream.pipe(res);

  try {
    await streaming(req, res, path, mime);
  } catch (error) {
    console.error(error);
  }
};

exports.getGoogleVoice = async (req, res, next) => {
  let ssmlArr;
  const { name, firstVoice } = req.query;

  if (firstVoice) {
    ssmlArr = startingVoice(name);
  } else {
    ssmlArr = sessionVoice(name);
  }
  // Random statement
  const ssml = ssmlArr[_.random(0, ssmlArr.length - 1, false)];

  // console.log(ssml);

  const request = {
    input: {
      ssml,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
      ssmlGender: "MALE",
    },
    audioConfig: {
      audioEncoding: "OGG_OPUS",
      effectsProfileId: ["headphone-class-device"],
      // sampleRateHertz: 48000,
      volumeGainDb: 10,
      pitch: -3.2,
    },
  };

  try {
    const response = await googleResponse(request);
    await streamingVoice(req, res, response.audioContent, "audio/ogg");

    // const duplexStream = new Stream.Duplex();

    // duplexStream.push(response.audioContent);
    // duplexStream.push(null);
    // duplexStream.pipe(res);
    console.log("voice loaded");
  } catch (error) {
    console.error(error);
  }
};
