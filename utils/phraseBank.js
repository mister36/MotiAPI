// Phrase bank for different situations

exports.start = (name) => {
  return [
    `<speak>${name}, let's get started</speak>`,
    `<speak>You're on the way to greatness, ${name}</speak>`,
  ];
};

exports.regular = (name) => {
  return [
    "<speak>you can do this</speak>",
    "<speak>Stick with this, and the results will come</speak>",
    `<speak>Are you going to get better today, ${name}?</speak>`,
  ];
};

exports.intense = (name) => {
  return [
    `<speak>Think about why you're doing this ${name}. What brought you here? What are you fighting for! Think!</speak>`,
  ];
};

exports.workout = (name) => {
  return [
    `<speak>${name}, will you get stronger today? Faster? Better?</speak>`,
    `<speak>Are you still feeling energetic?</speak>`,
    `<speak>You don't exercise because you have to, ${name}. It is because you choose to, and that's why you will succeed!</speak>`,
  ];
};
