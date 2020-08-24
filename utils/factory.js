const fs = require("fs");
const stream = require("stream");
const { promisify } = require("util");

exports.streaming = async (req, res, path, contentType) => {
  try {
    const stat = await promisify(fs.stat)(path);
    const fileSize = stat.size;
    console.log("fileSize", fileSize);
    const range = req.headers.range;
    console.log("range", range);

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": contentType,
      };

      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.streamingVoice = async (req, res, fileUint, contentType) => {
  try {
    const fileStream = new stream.Duplex();
    fileStream.push(fileUint);
    fileStream.push(null);
    // const stat = await promisify(fs.stat)(path);
    const fileSize = fileUint.byteLength;
    console.log("fileSize", fileSize);
    const range = req.headers.range;
    console.log("range", range);

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;

      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": contentType,
      };
      res.writeHead(206, head);
      fileStream.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": contentType,
      };

      res.writeHead(200, head);
      fileStream.pipe(res);
    }
  } catch (error) {
    console.error(error);
  }
};
