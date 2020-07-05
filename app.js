// Import packages
const express = require("express");
const morgan = require("morgan");

// !Import routers
const audioRouter = require("./routes/audioRoutes");

// !Initialize
const app = express();

// !Middleware
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : null;

// Allows fetching of data from req.body
app.use(express.json());

// !Use routes
app.use("/api/v1/audio", audioRouter);

// !Error handling
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route does not exist",
  });
});

// !Export
module.exports = app;
