const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');

async function textToSpeech(text) {
  const timestamp = Date.now();
  const audioFile = `audioFile-${timestamp}.wav`;
  // This example requires environment variables named "SPEECH_KEY" and "SPEECH_REGION"
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    process.env.AZURE_KEY_1,
    process.env.SERVICE_REGION,
  );
  const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

  // The language of the voice that speaks.
  speechConfig.speechSynthesisVoiceName = 'en-US-GuyNeural';

  // Create the speech synthesizer.
  let synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  let solvePromise;

  const obtainFilePromise = new Promise((resolve) => {
    solvePromise = resolve;
  });

  // Start the synthesizer and wait for a result.
  synthesizer.speakTextAsync(
    text,
    (result) => {
      if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
        fs.readFile(audioFile, (err, data) => {
          if (err) throw err;
          const base64Data = Buffer.from(data).toString('base64');

          solvePromise(base64Data);
          fs.unlink(audioFile, () => {});
        });
      } else {
        console.error(`Speech synthesis canceled, ${result.errorDetails
        }\nDid you set the speech resource key and region values?`);
      }
      synthesizer.close();
      synthesizer = null;
    },
    (err) => {
      console.trace(`err - ${err}`);
      synthesizer.close();
      synthesizer = null;
    },
  );

  return obtainFilePromise;
}

module.exports = {
  textToSpeech,
};
