const phraseBank = require("../utils/phraseBank");

const workoutConfig = (req, res, next) => {
  // Sends text along to audio controller
  req.text = phraseBank.workout(req.body.name);
  switch (req.query.intensity) {
    case "regular":
      req.text = [...req.text, ...phraseBank.regular(req.body.name)];
  }
  next();
};

module.exports = workoutConfig;
