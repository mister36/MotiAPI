const AWS = require("aws-sdk");
const Stream = require("stream");
const Speaker = require("speaker");
const fs = require("fs");

exports.getAudio = (req, res, next) => {
  const Polly = new AWS.Polly({
    region: "us-east-2",
  });

  const Player = new Speaker({
    channels: 1,
    bitdepth: 16,
    sampleRate: 16000,
  });

  let input = {
    Text: "This is a new day",
    OutputFormat: "mp3",
    VoiceId: "Matthew",
  };

  Polly.synthesizeSpeech(input, (err, data) => {
    if (err) {
      console.log(err.code);
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        fs.writeFile("./audio.mp3", data.AudioStream, (error) => {
          if (error) {
            return console.log(error);
          }
          console.log("file saved");
        });

        let bufferStream = new Stream.PassThrough();

        bufferStream.end(data.AudioStream);

        bufferStream.pipe(Player);
      }
    }
  });
  res.status(200).download("./audio.mp3", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("downloaded");
    }
  });
};
