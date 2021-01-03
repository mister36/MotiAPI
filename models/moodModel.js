const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Mood must have a description"],
  },
  sentiment: {
    type: Number,
    required: [true, "Mood must have a rating"],
    validate: {
      validator: function(val) {
        // between -1 and 1, inclusive
        return val <= 1 && val >= -1;
      },
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = moodSchema;
