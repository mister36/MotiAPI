const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  sender_id: String,
  active_loop: {},
  events: [{}],
  followup_action: mongoose.Schema.Types.Mixed,
  latest_action: {},
  latest_action_name: String,
  latest_event_time: Number,
  latest_input_channel: String,
  latest_message: {},
  paused: Boolean,
  slots: {},
  _user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const conversationModel = mongoose.model(
  "Conversation",
  conversationSchema
);
