// Imports
// source ./venv/bin/activate
const { performance } = require("perf_hooks");

const uWS = require("uWebSockets.js");
const dotenv = require("dotenv");
const ab2str = require("arraybuffer-to-string");
const jwt = require("jsonwebtoken");
const userSchema = require("./models/userModel");
const { motiConn } = require("./dbConnection");

const User = motiConn.model("User", userSchema);

// Environment variables
dotenv.config({ path: `${__dirname}/config.env` });
const httpPort = process.env.HTTP_PORT;
const wsPort = process.env.WS_PORT;

// Express app
const app = require("./app");

// Create server
const server = require("http").createServer(app);

// TODO: Change code like this: https://github.com/uNetworking/uWebSockets.js/discussions/414

// TODO: Unique id for each user; after certain amount of time, change
const id = "cool";

const isUserNew = async (id) => {
  try {
    const user = await User.findById(id);
    return user.new;
  } catch (error) {
    console.log(error);
  }
};

const wsApp = uWS
  .App()
  .ws("/chat", {
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    maxBackpressure: 1024,
    idleTimeout: 30,
    open: (ws) => {
      // console.log("WebSocket connection established");
    },

    message: async (ws, message, isBinary) => {
      const data = JSON.parse(ab2str(message));
      let response;

      switch (data.event) {
        case "ping":
          ws.send(JSON.stringify({ event: "pong" }));
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
            const isNew = await isUserNew(token.id);
            // // sets info in rasa
            // /EXTERNAL_set_info{"user_is_new": "true"}
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
                      user_id: token.id,
                      user_is_new: isNew,
                    }),
                  client_id: id,
                  email: ws.email,
                },
              })
            );

            // if new user, start new user flow
            if (isNew) {
              console.log("New user alert");
              ws.publish(
                "rasa/message",
                JSON.stringify({
                  event: "user_message",
                  data: {
                    message: "/EXTERNAL_new_user",
                    client_id: id,
                    email: ws.email,
                  },
                })
              );
            }

            console.log("websocket subscribed");
          } catch (error) {
            console.log(error);
            ws.end(4000, "Either no jwt provided, or it is invalid");
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

          ws.publish("rasa/message", message);
          break;

        case "bot_message":
          // console.log(data);
          email = data.email;

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
        `websocket closed with code ${code}. Reason: ${ab2str(message)}`
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
