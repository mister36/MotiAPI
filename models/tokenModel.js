const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Token must be connected to an email"],
  },
  token: {
    type: String,
    required: [true, "Requires a token"],
  },
});

module.exports = tokenSchema;
