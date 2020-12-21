const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");
const { motiConn } = require("../dbConnection");

const User = motiConn.model("User", userSchema);

exports.signUp = async (req, res, next) => {
  const { email, name, password } = req.body;

  // if all fields aren't specified
  if (!email || !name || !password)
    throw Error("Must provide an email, name, and password");

  try {
    const user = await User.create({ email, name, password });

    res.status(200).json({
      status: "success",
      email,
      name,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};
