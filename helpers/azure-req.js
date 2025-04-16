const sdk = require('microsoft-cognitiveservices-speech-sdk');

const azureKey = process.env.AZURE_KEY_1;
const speechRegion = process.env.SERVICE_REGION;
const speechConfig = sdk.SpeechConfig.fromSubscription(azureKey, speechRegion);
speechConfig.speechRecognitionLanguage = 'en-US';

function parseResult(result) {
  // console.log(result);
  const final = JSON.parse(result.privJson);
  const nbest = final.NBest[0];
  const keys = ['AccuracyScore', 'FluencyScore', 'CompletenessScore', 'PronScore'];

  const subKey = 'PronunciationAssessment';
  const accScore = 'AccuracyScore';
  keys.forEach((key) => {
    nbest[key] = nbest[subKey][key];
  });
  delete nbest[subKey];

  nbest.Words.forEach((thisWord) => {
    const word = thisWord;
    word[accScore] = word[subKey][accScore];
    delete word[subKey];

    word.Phonemes.forEach((thisPhoneme) => {
      const phoneme = thisPhoneme;
      phoneme[accScore] = phoneme[subKey][accScore];
      delete phoneme[subKey];
    });
  });
  return nbest;
}

async function fromBuffer(buffer, referenceText = '') {
  const audioConfig = sdk.AudioConfig.fromWavFileInput(buffer);

  const speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  const pronAssessmentConfig = new sdk.PronunciationAssessmentConfig(
    referenceText,
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    true,
  );

  pronAssessmentConfig.applyTo(speechRecognizer);

  let resolvePromise;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  speechRecognizer.recognizeOnceAsync((speechRecognitionResult) => {
    speechRecognizer.close();
    // console.log(pronunciationAssessmentResultJson);
    resolvePromise(speechRecognitionResult);
  }, (err) => {
    console.log(err);
  });

  const results = await promise;

  const parsedResults = parseResult(results);
  return parsedResults;
}

module.exports = {
  fromBuffer,
};
