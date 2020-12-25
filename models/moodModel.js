const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  description: String,
  moodRating: Number,
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
