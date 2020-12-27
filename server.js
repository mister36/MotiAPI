// Imports
// source ./venv/bin/activate

// const http = require("http");
const dotenv = require("dotenv");
const { motiConn, chatbotConn } = require("./dbConnection");

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

const app = require("./app");

// Create server
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// RASA & NODE JS
const rasaIo = require("socket.io-client");

const rasaSocket = rasaIo("http://192.168.1.72:5005", {
  path: "/socket.io",
});

rasaSocket.on("connect", () => {
  console.log("Socket connected to Rasa");
  rasaSocket.emit("session_request", { session_id: "moti-chat-1" });
});

rasaSocket.on("disconnect", () => {
  console.log("Rasa socket disconnected");
});

// NODE JS SERVER & REACT NATIVE
io.on("connection", (client) => {
  console.log("User connected");

  client.on("disconnect", () => {
    console.log("User disconnected");
  });

  client.on("user_message", (message) => {
    rasaSocket.emit("user_message", {
      message: message,
      session_id: "moti-chat-1",
    });

    rasaSocket.on("bot_message", (message) => {
      client.emit("bot_message", message.text);
    });
  });
});

server.listen(port, () => {
  console.log(`Moti server running on port ${port}`);
});
