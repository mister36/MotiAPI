const express = require("express");
const rasaController = require("../controllers/rasaController");

const router = express.Router();

router.route("/webhook").post(rasaController.action);

router.route("/test").post(rasaController.test);

module.exports = router;

// const timeResponse = await axios({
//     url: "http://192.168.1.72:8000/parse",
//     method: "POST",
//     data: `locale=en_US&text=${latest_message_text}&reftime=${latest_time *
//       1000}&dims="[\"time\"]&tz=${tz}`,
//   });
