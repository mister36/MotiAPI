const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Must provide an email"],
    validate: [validator.isEmail, "Must provide a valid email"],
  },
  name: {
    type: String,
    required: [true, "Must provide a name"],
    validate: [validator.isAlpha, "Name can only contain letters"],
  },
  password: {
    type: String,
    required: [true, "Must provide a password"],
    minlength: [6, "Password must have at least six characters"],
    maxlength: [16, "Password must have 16 or less characters"],
  },
  points: {
    type: Number,
    default: 0,
  },
  premium: {
    type: Boolean,
    default: false,
  },
  new: {
    type: Boolean,
    default: true,
  },
});

userSchema.virtual("goals", {
  ref: "User",
  localField: "_id",
  foreignField: "userId",
  options: { sort: { dateEnd: 1 } }, // will sort goals from closest to farthes
});

// MIDDLEWARE
// hashing password
userSchema.pre("save", async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// METHODS
userSchema.methods.isCorrectPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = userSchema;
