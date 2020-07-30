const express = require("express");
const audioController = require("../controllers/audioController");
const workoutConfig = require("../middlewares/workout");

const router = express.Router();

router.route("/background").get(audioController.getBackgroundAudio);

// router.route("/mj").get(audioController.getMJ);
// router.route("/mj5").get(audioController.specDuration);

// router.get("/workout", workoutConfig, audioController.getAudio);

module.exports = router;
