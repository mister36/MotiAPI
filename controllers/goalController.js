const jwt = require("jsonwebtoken");
const goalSchema = require("../models/goalModel");
const { motiConn } = require("../dbConnection");

const Goal = motiConn.model("Goal", goalSchema);

// TODO: Make secure after ALPHA
exports.getGoals = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const info = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = info;

    const goals = await Goal.find({ userId: id });
    res.status(200).json({
      status: "success",
      goals,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};
