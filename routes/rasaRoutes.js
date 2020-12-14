const express = require("express");
const rasaController = require("../controllers/rasaController");

const router = express.Router();

router.route("/webhook").post(rasaController.action);

module.exports = router;
