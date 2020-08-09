const express = require("express");
const audioController = require("../controllers/audioController");

const router = express.Router();

router.route("/background").get(audioController.getBackgroundAudio);

router.route("/voice").get(audioController.getGoogleVoice);

module.exports = router;
