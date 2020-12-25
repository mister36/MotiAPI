const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["mission", "habit", "task"],
    required: [true, "Goal must have a type"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  dateEnd: {
    type: Date,
  },
  description: {
    type: String,
    required: [true, "Goal must have a description"],
  },
  // Repeats only for habits
  daysRepeat: [String],
  timeRepeat: Number,
  _user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = goalSchema;
