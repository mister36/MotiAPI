import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  type: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  dateEnd: Date,
  description: String,
  // Repeats only for habits
  daysRepeat: [String],
  timeRepeat: Number,
  _user_id: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Goal = mongoose.model("Goal", goalSchema);
