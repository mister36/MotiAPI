const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");
const { motiConn } = require("../dbConnection");

const User = motiConn.model("User", userSchema);

const signToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "3 days" });
};

exports.signUp = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.create({ email, name, password });

    const token = signToken({ name, email });

    res.status(201).json({
      status: "success",
      email,
      name,
      token,
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
