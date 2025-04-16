const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

async function requestByPrompt(prompt) {
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.5,
    max_tokens: 200,
  });

  const { text } = response.data.choices[0];
  console.log(text);

  return text;
}

async function chatRequest(messages) {
  // const prompt = 'Once upon a time';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
  };

  console.log(messages);

  const data = {
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 100,
    temperature: 0.5,

  };
  let apiResponse = null;

  try {
    apiResponse = await axios.post(apiUrl, data, { headers });
    // console.log(apiResponse.data.choices);
  } catch (err) {
    console.log(err);
  }

  return apiResponse;
}

async function requestByDialog(messageObject) {
  const response = await chatRequest(messageObject);
  return response.data.choices[0].message.content;
}

async function turboRequest(system, prompt) {
  // const prompt = 'Once upon a time';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
  };

  const messages = [
    { role: 'system', content: system },
    { role: 'user', content: prompt },
  ];

  const data = {
    model: 'gpt-4-turbo',
    messages,
    max_tokens: 1024,
    temperature: 0.5,

  };

  try {
    const apiResponse = await axios.post(apiUrl, data, { headers });
    console.log(apiResponse.data.choices);
    const finaleResponse = apiResponse.data.choices[0].message.content;
    return finaleResponse;
  } catch (err) {
    console.log(err.response);
  }


}

module.exports = {
  requestByPrompt,
  requestByDialog,
  turboRequest,
};
