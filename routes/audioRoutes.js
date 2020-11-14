const express = require("express");
const audioController = require("../controllers/audioController");

const router = express.Router();

router.route("/background.opus").get(audioController.getBackgroundAudioOpus);

router.route("/background.mp3").get(audioController.getBackgroundAudioMP3);

router.route("/voice.opus").get(audioController.getGoogleVoice);

router.route("/sound.opus").get(audioController.getSoundEffect);

// router.route("/test.opus").get(audioController.testMP3);

// router.route("/test").get(audioController.testGoogleMedia);

module.exports = router;
