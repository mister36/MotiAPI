// Phrase bank for different situations

exports.startingVoice = (name) => {
  return [
    `<speak><prosody pitch="-3st">${name}, let's start</prosody>
  </speak>`,
    `<speak>
    <prosody pitch="-3st">${name}, are you ready?</prosody>
</speak>`,
  ];
};

exports.sessionVoice = (name) => {
  return [
    `<speak>
    <prosody pitch="-1st"><emphasis level="strong">${name}, What is it that you desire?</emphasis></prosody>
  </speak>`,
    `<speak>
    <prosody pitch="-1st"><emphasis level="strong">How much better will you get today?</emphasis></prosody>
  </speak>`,
    `<speak>
  <prosody pitch="-1st" rate="110%">Now is not the time to quit. <break strength="medium" /> Don't lose that energy</prosody>
</speak>`,
  ];
};
