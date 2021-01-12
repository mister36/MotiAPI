// Imports
// source ./venv/bin/activate
const { performance } = require("perf_hooks");

const WebSocket = require("ws");
const dotenv = require("dotenv");
const ab2str = require("arraybuffer-to-string");
const jwt = require("jsonwebtoken");
const userSchema = require("./models/userModel");
const { motiConn, chatbotConn } = require("./dbConnection");

const User = motiConn.model("User", userSchema);

// Environment variables
dotenv.config({ path: `${__dirname}/config.env` });
const httpPort = process.env.HTTP_PORT;
const wsPort = process.env.WS_PORT;

// Express app
const app = require("./app");

// TODO: Remove
let t0;
let t1;

// Create server
const server = require("http").createServer(app);

const uWS = require("uWebSockets.js");

let rasaWs;

const id = "o4few6";

const wsApp = uWS
  .App()
  .ws("/*", {
    compression: uWS.DISABLED,
    maxPayloadLength: 16 * 1024 * 1024,
    maxBackpressure: 1024,
    open: (ws) => {
      console.log("WebSocket connection established");

      // // TODO: Reconnection
      rasaWs = new WebSocket(
        "ws://192.168.1.72:5005/webhooks/websockets/websocket"
      );

      rasaWs.on("open", () => {
        // Sends a session request
        // TODO: Add id field like socket.io on each message
        const data = JSON.stringify({
          event: "session_request",
          data: {
            client_id: id,
          },
        });

        if (rasaWs.readyState === WebSocket.OPEN) {
          rasaWs.send(data, null, (err) => {
            if (err) console.log(err);
          });
        }
      });
      rasaWs.on("message", (data) => {
        const message = JSON.parse(data);
        // TODO: Better destructuring
        const { event } = message;

        switch (event) {
          case "connection":
            break;
          case "session_accepted":
            break;
          case "bot_message":
            t1 = performance.now();
            console.log(`took ${t1 - t0} milliseconds`);
            const response = JSON.stringify(message.data);
            ws.send(response);
            break;
          default:
            console.log(`Unknown event ${event}`);
        }
      });
      rasaWs.on("error", (err) => {
        console.log("error");
        console.log(err);
      });

      rasaWs.on("close", (code, reason) => {
        console.log("Rasa connection closed");
        console.log(reason);
      });
    },
    message: (ws, message, isBinary) => {
      const data = JSON.stringify({
        event: "user_message",
        data: {
          message: ab2str(message),
          client_id: id,
        },
      });

      if (rasaWs.readyState === WebSocket.OPEN) {
        rasaWs.send(data);
      }

      t0 = performance.now();
    },
    close: (ws, code, message) => {
      console.log(`Websocket connection closed with code ${code}`);
      rasaWs.close();
    },
    drain: (ws) => {
      console.log(`Backpressure: ${ws.getBufferedAmount()}`);
    },
  })
  .listen(parseInt(wsPort, 10), (listenSocket) => {
    if (listenSocket) {
      console.log(`Websocket listening on port ${wsPort}`);
    }
  });

// Middleware
// io.use((client, next) => {
//   // verifies JWT from client, throws error if invalid
//   try {
//     // TODO: Determine correct way to use JWT with mobile
//     const token = jwt.verify(
//       client.handshake.auth.token,
//       process.env.JWT_SECRET
//     );
//     client.name = token.name;
//     client.email = token.email;
//     next();
//   } catch (error) {
//     next(new Error("Invalid JWT"));
//   }
// });

// // finds user from email in JWT
// io.use(async (client, next) => {
//   try {
//     const user = await User.findOne({ email: client.email });
//     client.mongoId = user._id;
//     client.isNew = user.new;
//     next();
//   } catch (error) {
//     console.log(error);
//     next(new Error("Something went wrong"));
//   }
// });

// // Socket connection
// io.on("connection", (client) => {
//   console.log("User connected");

//   // ANCHOR Client events
//   client.on("disconnect", () => {
//     console.log("User disconnected");
//   });

//   client.on("greet", () => {
//     rasaSocket.emit("user_message", { session_id: id, message: "/greet" });
//   });

//   // Sending message to Rasa
//   client.on("user_message", (message) => {
//     rasaSocket.emit("user_message", {
//       message: message,
//       session_id: id,
//     });
//   });

//   // ANCHOR RASA & NODE JS
//   const rasaIo = require("socket.io-client");

//   const rasaSocket = rasaIo("http://192.168.1.72:5005", {
//     path: "/socket.io",
//     transports: ["websocket"],
//   });

//   // TODO: Change this:
//   const id = (Math.random() * 34234).toString(10);

//   // ANCHOR Rasa events
//   // Connection to Rasa socket
//   rasaSocket.on("connect", () => {
//     console.log("Socket connected to Rasa");

//     rasaSocket.emit("session_request", { session_id: id });

//     // Sets "user_name", "user_email", "user_id" slots
//     rasaSocket.emit(
//       "user_message",
//       {
//         message:
//           "/EXTERNAL_set_info" +
//           JSON.stringify({
//             user_name: client.name,
//             user_email: client.email,
//             user_id: client.mongoId,
//             user_is_new: client.isNew,
//           }),
//         session_id: id,
//       },
//       () => {
//         // sends 'EXTERNAL_new_user' intent if user is new
//         if (client.isNew) {
//           rasaSocket.emit("user_message", {
//             session_id: id,
//             message: "/EXTERNAL_new_user",
//           });
//         }
//       }
//     );
//   });

//   rasaSocket.on("disconnect", () => {
//     console.log("Rasa socket disconnected");
//   });

//   // Sending message to client
//   rasaSocket.on("bot_message", (message) => {
//     client.emit("bot_message", message.text);
//   });
// });

server.listen(httpPort, () => {
  console.log(`HTTP server running on port ${httpPort}`);
});
