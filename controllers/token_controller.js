const axios = require('axios');

async function getSpeechToken(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const speechKey = process.env.AZURE_KEY_1;
  const speechRegion = process.env.SERVICE_REGION;

  if (speechKey === 'paste-your-speech-key-here' || speechRegion === 'paste-your-speech-region-here') {
    res.status(400).send('You forgot to add your speech key or region to the .env file.');
  } else {
    const headers = {
      headers: {
        'Ocp-Apim-Subscription-Key': speechKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    try {
      const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
      res.send({ token: tokenResponse.data, region: speechRegion });
    } catch (err) {
      console.log(err);
      res.status(401).send('There was an error authorizing your speech key.');
    }
  }
}

module.exports = {
  getSpeechToken,
};
