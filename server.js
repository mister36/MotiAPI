// Imports
const socketio = require("socket.io");
const dotenv = require("dotenv");
const fs = require("fs");
const base64 = require("byte-base64");

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

const app = require("./app");

// Start server
const expressServer = app.listen(port, () =>
  console.log(`Cheer server running on port ${port}`)
);

// Start socket.io server
const io = socketio(expressServer);

let file;

fs.readFile(`${__dirname}/music/example.mp3`, (err, data) => {
  if (err) console.log(err);
  file = data;
});

// const stream = ss.createStream()

io.of("/audio").on("connect", (socket) => {
  console.log("connected");

  socket.on("sendAudio", (info) => {
    console.log("got request");
    const stream = fs.createReadStream(`${__dirname}/music/example.mp3`);

    stream.on("data", (chunk) => {
      console.log(typeof chunk, chunk.length);
      socket.emit("receiveAudio", base64.bytesToBase64(new Uint8Array(chunk)));
    });

    stream.on("end", () => console.log("ENDED"));

    // const stream2 = fs.createReadStream(`${__dirname}/music/workout1.mp3`);

    // stream2.on("data", (chunk) => {
    //   socket.emit("receiveAudio", base64.bytesToBase64(new Uint8Array(chunk)));
    // });

    // stream2.on("end", () => console.log("ENDED2"));
    // socket.emit("audioStream", file);
  });
});
