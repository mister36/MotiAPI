const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema({
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
    required: [true, "Mission must have an end date"],
  },
  description: {
    type: String,
    required: [true, "Goal must have a description"],
  },
  completed: {
    type: Boolean,
    default: false,
  },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Goal" }],
});

module.exports = missionSchema;
