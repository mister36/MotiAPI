const express = require("express");
const goalController = require("../controllers/goalController");

const router = express.Router();

router.route("/").get(goalController.getGoals);

module.exports = router;
