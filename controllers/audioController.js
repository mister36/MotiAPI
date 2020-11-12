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

const songs = [
  "hero1",
  "hero2",
  "hero3",
  "hero4",
  "hero5",
  "hero6",
  "rise1",
  "rise2",
  "rise3",
  "rise4",
  "rise5",
  "rise6",
];

const sounds = [
  "explosion",
  "horse",
  "sword_fight",
  "tiger",
  "tomorrow_chant",
  "war_chant",
  "yes_chant",
];

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

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Must enter a name",
    });
  }

  if (!songs.includes(name)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid song name",
    });
  }

  mime = "audio/opus";

  const path = `${__dirname}/../music/${name}.opus`;

  try {
    await streaming(req, res, path, mime);
    // fs.createReadStream(path).pipe(res);
    console.log("SENT OGG SUCCESSFULLY");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Server error",
    });
  }
};

exports.getGoogleVoice = async (req, res, next) => {
  let ssmlArr;
  const { firstName, firstVoice, genre } = req.query;

  if (!firstName || !genre) {
    return res.status(400).json({
      status: "fail",
      message: "Must enter a first name and genre",
    });
  }

  if (firstVoice) {
    ssmlArr = startingVoice(firstName);
  } else if (genre === "hero") {
    ssmlArr = heroBank(firstName);
  } else if (genre === "rise") {
    ssmlArr = riseBank(firstName);
  }
  // Random statement
  const ssml = ssmlArr[_.random(0, ssmlArr.length - 1, false)];

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
    res.status(500).json({
      status: "Error",
      message: "Server error",
    });
  }
};

exports.getSoundEffect = async (req, res, next) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Must enter a name",
    });
  }

  if (!sounds.includes(name)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid sound name",
    });
  }

  const path = `${__dirname}/../sounds/${name}.opus`;

  try {
    await streaming(req, res, path, "audio/opus");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Server error",
    });
  }
};
