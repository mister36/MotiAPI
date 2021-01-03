const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Mood must have a description"],
  },
  moodRating: {
    type: Number,
    required: [true, "Mood must have a rating"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  _user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Mood = mongoose.model("Mood", moodSchema);
