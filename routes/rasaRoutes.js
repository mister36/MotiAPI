const express = require("express");
const rasaController = require("../controllers/rasaController");

const router = express.Router();

router.route("/webhook").post(rasaController.action);

router.route("/test").post(rasaController.test);

module.exports = router;
