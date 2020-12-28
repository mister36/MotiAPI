// Import packages
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

// TODO : Remove this
const NotificationService = require("./pushNotifications");

// !Import routers
const audioRouter = require("./routes/audioRoutes");
const rasaRouter = require("./routes/rasaRoutes");
const userRouter = require("./routes/userRoutes");

// !Initialize
const app = express();

// !Middleware
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

// Allows fetching of data from req.body
app.use(express.json());
// Sets security headers
app.use(helmet());

// TODO: Remove this
// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });

// !Use routes
app.get("/", (req, res) => {
  res.send("Welcome to the Motisesh API");
});

app.use("/api/v1/audio", audioRouter);
app.use("/api/v1/chatbot", rasaRouter);
app.use("/api/v1/user", userRouter);

// TODO : Remove this
app.get("/test-send", async (req, res) => {
  const notification = new NotificationService();

  const registrationIds = [
    "evBUOOJJTZihOH5P57yLS4:APA91bH0Mvru5rmKAhOvdgQWMUGHcel3sU8N2iWiH160sI_nLyhXxUKKB4e9cDYKxTtCVJytObBHSYlez2a3Uiak8rzMomXDmF9uy6jBv42lf36gcpBQ_RSYYBNDu-WNcJJ72dOhksAp",
    "9b679e219d54c5a703643ad4dc7b4caf5602add7e914a55a4ffc6202a5af755c",
  ];

  const data = {
    title: "This",
    body: "Is amazing. So glad it works",
    topic: "com.motisesh.motisesh",
    custom: {
      sender: "Motisesh",
    },
    icon: "ic_icon",
    color: "white",
    priority: "high",
    android_channel_id: "4323",
  };

  notification
    .send(registrationIds, data)
    .then((results) => {
      // console.log(results);
      // console.log(results[0].message);
      res.status(200).json({
        results,
        // message: results[0].message,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });

  // res.end("Done");
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
