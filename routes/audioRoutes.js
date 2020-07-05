const express = require("express");
const audioController = require("../controllers/audioController");
const workoutConfig = require("../middlewares/workout");

const router = express.Router();

// router.route("/").get(audioController.getAudio);

router.get("/workout", workoutConfig, audioController.getAudio);

module.exports = router;
