const fs = require("fs");
const stream = require("stream");
const path = require("path");
const { promisify } = require("util");

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

exports.serveStaticAudio = (mime) => async (req, res, next) => {
  let { name } = req.query;
  let extension, resourceType, musicPath;

  // determines whether user is asking for song or sound
  if (req.url.includes("background")) {
    resourceType = "song";
  } else if (req.url.includes("sound")) {
    resourceType = "sound";
  }

  // check what comes after the audio/ in mime, e.g audio/mpeg => mpeg
  switch (mime.slice(6)) {
    case "mpeg":
      extension = "mp3";
      break;
    default:
      extension = mime.slice(6);
  }

  // Error if no name provided
  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Must enter a name",
    });
  }

  // If client asked for background  but name not in song array
  if (resourceType === "song" && !songs.includes(name)) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid song name",
    });
  } else if (resourceType === "sound" && !sounds.includes(name)) {
    // If client asked for sound  but name not in sound array
    return res.status(400).json({
      status: "fail",
      message: "Invalid sound name",
    });
  }

  // Determines correct directory based off resourceType (song or sound)
  if (resourceType === "song") {
    musicPath = path.resolve(`${__dirname}/../music/${name}.${extension}`);
  } else if (resourceType === "sound") {
    musicPath = path.resolve(`${__dirname}/../sounds/${name}.${extension}`);
  }

  try {
    res.sendFile(musicPath, { headers: { "Content-Type": mime } });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Server error",
    });
  }
};

// exports.streaming = async (req, res, path, contentType, chunk = false) => {
//   try {
//     const stat = await promisify(fs.stat)(path);
//     const fileSize = stat.size;
//     console.log("fileSize", fileSize);
//     const range = req.headers.range;
//     console.log("range", range);

//     if (range) {
//       const parts = range.replace(/bytes=/, "").split("-");
//       const start = parseInt(parts[0], 10);
//       const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//       const chunkSize = end - start + 1;
//       const file = fs.createReadStream(path, { start, end });

//       const head = {
//         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunkSize,
//         "Content-Type": contentType,
//       };
//       res.writeHead(206, head);
//       file.pipe(res);
//     } else {
//       const head = {
//         "Content-Length": fileSize,
//         "Content-Type": contentType,
//       };

//       res.writeHead(200, head);
//       fs.createReadStream(path).pipe(res);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// exports.streamingVoice = async (req, res, fileUint, contentType) => {
//   try {
//     const fileStream = new stream.Duplex();
//     fileStream.push(fileUint);
//     fileStream.push(null);
//     // const stat = await promisify(fs.stat)(path);
//     const fileSize = fileUint.byteLength;
//     console.log("fileSize", fileSize);
//     const range = req.headers.range;
//     console.log("range", range);

//     if (range) {
//       const parts = range.replace(/bytes=/, "").split("-");
//       const start = parseInt(parts[0], 10);
//       const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//       const chunkSize = end - start + 1;

//       const head = {
//         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunkSize,
//         "Content-Type": contentType,
//       };
//       res.writeHead(206, head);
//       fileStream.pipe(res);
//     } else {
//       const head = {
//         "Content-Length": fileSize,
//         "Content-Type": contentType,
//       };

//       res.writeHead(200, head);
//       fileStream.pipe(res);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
