// Imports
// source ./venv/bin/activate

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const userSchema = require("./models/userModel");
const { motiConn, chatbotConn } = require("./dbConnection");

const User = motiConn.model("User", userSchema);

// Environment variables
dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

// Express app
const app = require("./app");

// Create server
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// TODO - Set up JWT authentication with socket.io

// ANCHOR NODE JS SERVER & REACT NATIVE

// Middleware
io.use((client, next) => {
  // verifies JWT from client, throws error if invalid
  try {
    const token = jwt.verify(
      client.handshake.auth.token,
      process.env.JWT_SECRET
    );
    client.name = token.name;
    client.email = token.email;
    next();
  } catch (error) {
    next(new Error("Invalid JWT"));
  }
});

// finds user from email in JWT
io.use(async (client, next) => {
  try {
    const user = await User.findOne({ email: client.email });
    client.mongoId = user._id;
    next();
  } catch (error) {
    console.log(error);
    next(new Error("Something went wrong"));
  }
});

// Socket connection
io.on("connection", (client) => {
  console.log("User connected");

  client.on("disconnect", () => {
    console.log("User disconnected");
  });

  // ANCHOR RASA & NODE JS
  const rasaIo = require("socket.io-client");

  const rasaSocket = rasaIo("http://192.168.1.72:5005", {
    path: "/socket.io",
  });

  rasaSocket.on("connect", () => {
    console.log("Socket connected to Rasa");
    rasaSocket.emit("session_request", { session_id: client.mongoId });
  });

  rasaSocket.on("disconnect", () => {
    console.log("Rasa socket disconnected");
  });

  client.on("user_message", (message) => {
    console.log(message);
    rasaSocket.emit("user_message", {
      message: message,
      session_id: client.mongoId,
    });

    rasaSocket.on("bot_message", (message) => {
      client.emit("bot_message", message.text);
    });
  });
});

server.listen(port, () => {
  console.log(`Moti server running on port ${port}`);
});
