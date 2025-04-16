const { turboRequest } = require('./openai-req');

function extractText(azureResponse) {
  return azureResponse.Display;
}

function xor(p, q) {
  return (p || q) && !(p && q);
}

// this function is used to build the messages object
// used for the chat endpoint on OpenAi
function buildMessagesObject(array, system, order) {
  const messages = [];
  messages.push({ role: 'system', content: system });

  for (let i = 0; i < array.length; i += 1) {
    // here xor is used to alternate between user and assistant
    if (!xor(i % 2 === 0, order === 'aiFirst')) {
      messages.push({ role: 'assistant', content: array[i] });
    } else {
      messages.push({ role: 'user', content: array[i] });
    }
  }

  return messages;
}

function createPromptToCheckObjective(messageObject, objective) {
  const prompt = `Answer with YES or NO if the following
  objective was fullfilled in this conversation: ${objective}.\n`;

  let conversation = '';
  // message is a array, iterate over it
  messageObject.forEach((message) => {
    conversation += `${message.role}: ${message.content}\n`;
  });
  return `${prompt + conversation}`;
}

function parseObjectiveResponse(response) {
  const responseStr = response.toLowerCase();
  if (responseStr.includes('yes')) {
    return true;
  } if (responseStr.includes('no')) {
    return false;
  }
  return false;
}

async function getGender(description) {
  console.log('WEHEEE');
  const system = 'detect if the following character is male or female. if it is a male return male and in the other case return female.';
  const response = await turboRequest(system, description);
  // console.log(response.data);

  // ans
  return response;
}

async function generateFirstDialog(characterDescription, context) {
  const response = await turboRequest(
    characterDescription,
    `Hello, please start a conversation with me and make ask me somthing related to ${context}`,
  );

  return response;
}

module.exports = {
  extractText,
  buildMessagesObject,
  createPromptToCheckObjective,
  parseObjectiveResponse,
  generateFirstDialog,
  getGender,
};
