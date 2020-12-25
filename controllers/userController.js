const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");
const { motiConn } = require("../dbConnection");

const User = motiConn.model("User", userSchema);

exports.signUp = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.create({ email, name, password });

    res.status(201).json({
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

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log("nope");
      throw "Must provide email and password";
    }

    const user = await User.findOne({ email });

    const correctPassword = await user.isCorrectPassword(
      password,
      user.password
    );

    if (!user || !correctPassword) {
      throw "Incorrect email or password";
    } else {
      return res.status(200).json({
        status: "success",
        email,
        name: user.name,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
