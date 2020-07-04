const express = require("express");
const audioController = require("../controllers/audioController");

const router = express.Router();

router.route("/").get(audioController.getAudio);

module.exports = router;
