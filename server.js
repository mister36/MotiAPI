// Imports
// source ./venv/bin/activate
const { performance } = require("perf_hooks");

const WebSocket = require("ws");
const uWS = require("uWebSockets.js");
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

// Create server
const server = require("http").createServer(app);

// TODO: Unique id for each user; after certain amount of time, change
const id = "will-change-man3";

const wsApp = uWS
  .App()
  .ws("/chat", {
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    maxBackpressure: 1024,
    open: (ws) => {
      console.log("WebSocket connection established");
    },

    message: (ws, message, isBinary) => {
      const data = JSON.parse(ab2str(message));
      let response;

      switch (data.event) {
        case "ping":
          break;
        case "rasa_sub":
          ws.subscribe("rasa/message");
          console.log("rasa subscribed");
          break;
        // Will subscribe to user topic once authenticated
        case "auth":
          try {
            const token = jwt.verify(data.data.message, process.env.JWT_SECRET);

            ws.email = token.email;
            ws.subscribe("rasa/user/" + token.email); // e.g, rasa/adam@gmail.com
            // // sets info in rasa
            ws.publish(
              "rasa/message",
              JSON.stringify({
                event: "user_message",
                data: {
                  message:
                    "/EXTERNAL_set_info" +
                    JSON.stringify({
                      user_name: token.name,
                      user_email: token.email,
                      user_id: token.mongoId,
                      user_is_new: token.isNew,
                    }),
                  client_id: id,
                  email: ws.email,
                },
              })
            );

            console.log("websocket subscribed");
          } catch (error) {
            console.log(error);
          }

          break;
        case "user_message":
          const message = JSON.stringify({
            event: "user_message",
            data: {
              message: data.data.message,
              client_id: id,
              email: ws.email,
            },
          });

          ws.publish("rasa/message", message, false);
          break;

        case "bot_message":
          email = data.data.email;

          response = JSON.stringify({
            event: "bot_message",
            data: data.data,
          });

          // sends to specified user
          ws.publish(`rasa/user/${email}`, response);
          break;
        default:
          console.log("Another message: ", data);
      }
    },
    close: (ws, code, message) => {
      console.log(
        `websocket closed with code ${code}. Reason: ${ab2str(
          message
        )}\nwebsocket email: ${ws.email}`
      );
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

server.listen(httpPort, () => {
  console.log(`HTTP server running on port ${httpPort}`);
});
