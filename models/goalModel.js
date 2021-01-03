const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["habit", "task"],
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
  // not needed for habits
  dateEnd: {
    type: Date,
    // required: [true, "Goal must have an end date"],
  },
  description: {
    type: String,
    required: [true, "Goal must have a description"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  // Repeats only for habits
  timeRepeat: {
    type: String,
  },
  mission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mission",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = goalSchema;
