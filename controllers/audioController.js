const AWS = require("aws-sdk");
const Stream = require("stream");
const Speaker = require("speaker");
const fs = require("fs");

exports.getAudio = (req, res, next) => {
  const Polly = new AWS.Polly({
    region: "us-east-2",
  });

  //   for (let i = 1; i < 4)
  const text = req.text[Math.floor(Math.random() * 5)];

  let input = {
    Text: text,
    OutputFormat: "mp3",
    VoiceId: "Matthew",
    TextType: "ssml",
  };

  Polly.synthesizeSpeech(input, (err, data) => {
    if (err) {
      console.log(err.code);
      return res.status(401).json({
        status: "failed",
        err,
      });
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        res.write(data.AudioStream);
        // let bufferStream = new Stream.PassThrough();
        // bufferStream.end(data.AudioStream);
        // bufferStream.pipe(Player);
        res.end();
      }
    }
  });
};
