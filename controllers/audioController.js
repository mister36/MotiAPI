const fs = require("fs");
const Stream = require("stream");
const { promisify } = require("util");
const _ = require("lodash");
const textToSpeech = require("@google-cloud/text-to-speech");
const { startingVoice, sessionVoice } = require("../utils/phraseBank");

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
  // let { duration } = req.query;
  // if (!duration || duration < 0 || duration > 300) duration = 150;

  const randomSongNum = _.random(1, 6, false);

  const background = fs.createReadStream(
    `${__dirname}/../music/song${randomSongNum}.mp3`
    // { start: 0, end: durationToBytes(duration) }
  );

  background.on("data", (chunk) => {
    res.write(chunk);
  });

  background.on("error", (err) => {
    console.log(err);
    res.end();
  });

  background.on("end", () => {
    res.end();
    console.log("Background music loaded");
  });
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

  const request = {
    input: {
      ssml,
    },
    voice: {
      languageCode: "en-US",
      name: "en-US-Wavenet-D",
      ssmlGender: "MALE",
    },
    audioConfig: { audioEncoding: "OGG_OPUS" },
  };

  try {
    const response = await googleResponse(request);

    const readableStream = new Stream.Readable();
    readableStream.push(response.audioContent);
    readableStream.push(null);

    readableStream.pipe(res);
    console.log("voice loaded");
  } catch (error) {
    console.error(error);
  }
};
