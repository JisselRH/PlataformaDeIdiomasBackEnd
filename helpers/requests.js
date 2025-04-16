const axios = require('axios');


async function analizeSpeech(file, referenceText = null) {
  const azureKey = process.env.AZURE_KEY_1;
  console.log('azure', azureKey);
  const url = 'https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-us';

  let refTextParam = '';
  if (referenceText) {
    refTextParam = `"ReferenceText":"${referenceText}",`;
  }

  const pronAssessmentParamsJson = `{"GradingSystem":"HundredMark",${refTextParam}"Dimension":"Comprehensive","phonemeAlphabet":"IPA"}`;
  const encodedParams = Buffer.from(pronAssessmentParamsJson).toString('base64');

  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': azureKey,
    Accept: 'application/json;text/xml',
    'Pronunciation-Assessment': encodedParams,
  };

  return 0;
}

module.exports = {
  analizeSpeech,
};
