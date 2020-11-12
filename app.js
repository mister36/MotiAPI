// Import packages
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

// TODO : Remove this
const NotificationService = require("./pushNotifications");

// !Import routers
const audioRouter = require("./routes/audioRoutes");

// !Initialize
const app = express();

// !Middleware
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

// Allows fetching of data from req.body
app.use(express.json());
// Sets security headers
app.use(helmet());

// app.all("*", (req, res, next) => {
//   // console.log(req.httpVersion);
//   res.end(req.stream.session);
// });

// !Use routes
app.get("/", (req, res) => {
  res.send("Welcome to the Motisesh API");
});
app.use("/api/v1/audio", audioRouter);

// TODO : Remove this
app.get("/test-send", async (req, res) => {
  const notification = new NotificationService();

  const registrationIds = [
    "e5GfdhGkR-Ca-jDnXwFjrJ:APA91bF5he4my6jNjUv5MWXzrA2MdoMb8f_yBtUf92j1PmrzUcnnWxNTEclkHV8JYPA7-deAnB8Ppyk_de2vmgIHm7pKkRs-D2AYPZvmlDe7Ic4pNZM-tEid_Epj5NhCeIda8ChfLNLL",
  ];

  notification
    .send(registrationIds, {
      title: "Testing Moti noti",
      body: "I'm so glad this worked",
      custom: {
        sender: "Motisesh",
      },
      priority: "high",
      android_channel_id: "4323",
    })
    .then((results) => {
      console.log(results);
      console.log(results[0].message);
    })
    .catch((err) => {
      console.log(err);
    });

  res.end("Done");
});

// !Error handling
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route does not exist",
  });
});

// !Export
module.exports = app;
