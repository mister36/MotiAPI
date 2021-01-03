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

// ANCHOR NODE JS SERVER & REACT NATIVE

// Middleware
io.use((client, next) => {
  // verifies JWT from client, throws error if invalid
  try {
    // TODO: Determine correct way to use JWT with mobile
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
    client.isNew = user.new;
    next();
  } catch (error) {
    console.log(error);
    next(new Error("Something went wrong"));
  }
});

// Socket connection
io.on("connection", (client) => {
  console.log("User connected");

  // ANCHOR Client events
  client.on("disconnect", () => {
    console.log("User disconnected");
  });

  client.on("greet", () => {
    rasaSocket.emit("user_message", { session_id: id, message: "/greet" });
  });

  // Sending message to Rasa
  client.on("user_message", (message) => {
    rasaSocket.emit("user_message", {
      message: message,
      session_id: id,
    });
  });

  // ANCHOR RASA & NODE JS
  const rasaIo = require("socket.io-client");

  const rasaSocket = rasaIo("http://192.168.1.72:5005", {
    path: "/socket.io",
    transports: ["websocket"],
  });

  // TODO: Change this:
  const id = (Math.random() * 34234).toString(10);

  // ANCHOR Rasa events
  // Connection to Rasa socket
  rasaSocket.on("connect", () => {
    console.log("Socket connected to Rasa");

    rasaSocket.emit("session_request", { session_id: id });

    // Sets "user_name", "user_email", "user_id" slots
    rasaSocket.emit(
      "user_message",
      {
        message:
          "/EXTERNAL_set_info" +
          JSON.stringify({
            user_name: client.name,
            user_email: client.email,
            user_id: client.mongoId,
            user_is_new: client.isNew,
          }),
        session_id: id,
      },
      () => {
        // sends 'EXTERNAL_new_user' intent if user is new
        if (client.isNew) {
          rasaSocket.emit("user_message", {
            session_id: id,
            message: "/EXTERNAL_new_user",
          });
        }
      }
    );
  });

  rasaSocket.on("disconnect", () => {
    console.log("Rasa socket disconnected");
  });

  // Sending message to client
  rasaSocket.on("bot_message", (message) => {
    client.emit("bot_message", message.text);
  });
});

server.listen(port, () => {
  console.log(`Moti server running on port ${port}`);
});
