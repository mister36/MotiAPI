const fs = require("fs");
const { promisify } = require("util");
const _ = require("lodash");
// const MP3Cutter = require("@mister36/mp3-cutter");

exports.getBackgroundAudio = async (req, res, next) => {
  const genre = req.query.genre;
  const duration = req.query.duration;

  const randomSongNum = _.random(1, 2, false);

  const background = fs.createReadStream(
    `${__dirname}/../music/${genre}${randomSongNum}.mp3`
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

// exports.getMJ = async (req, res, next) => {
//   const file = fs.createReadStream(`${__dirname}/../music/billiejean.mp3`, {
//     start: 0,
//     end: 100000,
//   });

//   file.on("data", (chunk) => {
//     res.write(chunk);
//   });

//   file.on("end", (chunk) => {
//     res.end();
//   });

//   file.on("error", (err) => {
//     console.error(err);
//   });
// };

// exports.specDuration = async (req, res, next) => {
//   try {
//     await promisify(MP3Cutter.cut)({
//       src: `${__dirname}/../music/billiejean.mp3`,
//       start: 0,
//       responseObj: res,
//       end: 15,
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };
