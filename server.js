// Imports
const socketio = require("socket.io");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

const app = require("./app");

// Start server
const expressServer = app.listen(port, () =>
  console.log(`Cheer server running on port ${port}`)
);
const io = socketio(expressServer);

io.on("connect", (socket) => {
  console.log("server is now connected to react native");

  socket.on("sendAudio", (data) => {
    console.log("Got it");
    console.log(data);
  });
});

module.exports = io;
