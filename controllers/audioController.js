const textToSpeech = require("@google-cloud/text-to-speech");

exports.getAudio = async (req, res, next) => {
  const client = new textToSpeech.TextToSpeechClient();

  const text = "Adam, your the best!";

  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "LINEAR16" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);

    res.write(response.audioContent);

    res.end();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
