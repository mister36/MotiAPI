const jwt = require("jsonwebtoken");
const userSchema = require("../models/userModel");
const tokenSchema = require("../models/tokenModel");
const { motiConn } = require("../dbConnection");

const User = motiConn.model("User", userSchema);
const Token = motiConn.model("Token", tokenSchema);

const signToken = (data = {}, expiresAt) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expiresAt });
};

exports.signUp = async (req, res, next) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.create({
      email,
      name: name ? name.charAt(0).toUpperCase() + name.slice(1) : null,
      password,
    });

    const data = { name, email, id: user._id, isNew: user.new };

    // Creates tokens
    const accessToken = signToken(data, "5 days");
    const refreshToken = signToken(data, "10 years");

    // Saves refresh token in database
    await Token.create({ email, token: refreshToken });

    // response
    res.status(201).json({
      status: "success",
      email,
      name,
      token: accessToken,
      refreshToken,
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

    if (!user) throw new Error("Incorrect email or password");

    const correctPassword = await user.isCorrectPassword(
      password,
      user.password
    );

    if (!correctPassword) {
      throw new Error("Incorrect email or password");
    } else {
      const data = { name: user.name, email, id: user._id, isNew: user.new };

      // Creates tokens
      const accessToken = signToken(data, "5 days");
      const refreshToken = signToken(data, "10 years");

      // Saves refresh token in database
      await Token.create({ email, token: refreshToken });

      // response
      return res.status(200).json({
        status: "success",
        email,
        name: user.name,
        token: accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "fail",
      error,
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  const { email, name, refreshToken } = req.body;
  try {
    const token = await Token.findOne({ email });

    // Error if no refresh token
    if (!token) throw new Error("Token not valid");

    // if token matches user data
    if (token.email === email && token.token === refreshToken) {
      const data = { name, email };

      // sign new access token for user, send
      const newToken = signToken(data, "5 days");

      res.status(201).json({
        token: newToken,
      });
    } else {
      // else return error
      res.status(400).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: "Something went wrong",
    });
  }
};
