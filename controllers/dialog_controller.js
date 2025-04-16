const fs = require('fs');
const { requestByPrompt, requestByDialog } = require('../helpers/openai-req');
const {
  buildMessagesObject, createPromptToCheckObjective, parseObjectiveResponse, getGender,
  generateFirstDialog,
} = require('../helpers/dialog');

async function askOpenAI(req, res) {
  const { prompt } = req.body;
  const response = await requestByPrompt(prompt);
  res.status(200).json(response.data.choices[0].text);
}

async function dialog(req, res) {
  const { messages, order, system } = req.body;
  const messageObject = buildMessagesObject(messages, system, order);
  const answer = await requestByDialog(messageObject);

  const response = { message: answer };
  res.status(200).json(response);
}

async function checkObjective(req, res) {
  const {
    messages, order, system, objective,
  } = req.body;

  const messageObject = buildMessagesObject(messages, system, order);
  const prompt = createPromptToCheckObjective(messageObject, objective);
  const answer = await requestByPrompt(prompt);
  const objectiveStatus = parseObjectiveResponse(answer);
  const response = { completed: objectiveStatus };

  res.status(200).json(response);
}

async function findContext(req, res) {
  console.log("findContext req---->>  ",req.params)
  const path = './assets/context.json';
  const { contextId } = req.params;

  const data = fs.readFileSync(path, 'utf8', () => {
  });

  const jsonData = JSON.parse(data);
  const context = jsonData[contextId];
  console.log(context);
  if (!context) {
    console.log('context not found');
    res.status(404).json({ message: 'context not found' });
  }

  const firstResponse = 'Hello, how have you been feeling lately?';
  context.firstGptResponse = firstResponse;

  // const base64File = await textToSpeech(firstResponse);
  // context.base64File = base64File;

  res.status(200).json(context);
}

async function firstReponse(req, res) {
  console.log("firstReponse -->",req.body);
  const response = {};

  const { context, characterDescription, characterName } = req.body;
  // const firstResponse = `Hello, my name is ${characterName}`;

  let gender = getGender(characterDescription);

  let firstResponse = generateFirstDialog(characterDescription, context);

  const promises = await Promise.all([gender, firstResponse]);
  gender = promises[0];
  firstResponse = promises[1];

  console.log(gender);


  if (gender === 'female') {
    response.neuralVoice = 'en-US-JennyNeural';
  } else if (gender === 'male') {
    response.neuralVoice = 'en-US-BrandonNeural';
  }

  response.firstDialog = firstResponse;
  console.log(response);

  res.status(200).json(response);
}

module.exports = {
  askOpenAI,
  dialog,
  checkObjective,
  findContext,
  firstReponse,
};
