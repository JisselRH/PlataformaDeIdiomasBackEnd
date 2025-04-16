const axios = require('axios');

const apiKey = process.env.OPEN_AI_KEY;

const connectionsCtrl = require('../controllers/connections_controller');

/*async function generateWordsOpenAi(context, nWords = 20) {
  const prompt = `generate ${nWords} words separated by coma, related to the following topic: ${context}`;

  const model = 'text-davinci-003';
  const temperature = 1;
  const maxTokens = 100;
  const endpoint = 'https://api.openai.com/v1/completions';

  const response = await axios.post(endpoint, {
    model,
    temperature,
    prompt,
    max_tokens: maxTokens,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });

  const { text } = response.data.choices[0];
  console.log(text);

  const cleanedText = text.replace(/[\n.]/g, '');

  const wordsArray = cleanedText.split(', ');

  return wordsArray;
}*/

async function generateWordsOpenAi(context, nWords = 20) {
  const endpoint = 'https://api.openai.com/v1/completions';
  const model = 'gpt-3.5-turbo-instruct';
  const temperature = 1;
  const maxTokens = 256;
  const prompt = `generate ${nWords} words separated by coma, related to the following topic: ${context}`;

  var json;

  await axios.post(endpoint, {
    model,
    temperature,
    prompt,
    max_tokens: maxTokens,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  }).then((res) => {
    /*json = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: res.data.choices[0],
      },
    };*/
    const { text } = res.data.choices[0];
    //console.log(text);

    const cleanedText = text.replace(/[\n.]/g, '');

    const wordsArray = cleanedText.split(', ');

    json = wordsArray;
  })
    .catch((error) => {
      /*json = {
        status: error.response.status,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          message: error.response.data.error.message,
        },
      };*/
      if (error.response) {
        json = '408';//El servidor se agotó esperando el resto de la petición del navegador
      } else if (error.request) {
        json = '503';//El servidor no está disponible para manejar esta solicitud en este momento
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        json = '400';//Mala petición
        console.log('Error', error.message);
      }
      console.log('*-*-*-*-* Error--->> ', error.message);
      console.log(error.config);
    });
  console.log("json ---->> ",json)
  return json;
};


async function requestByPrompt(prompt) {
  const endpoint = 'https://api.openai.com/v1/completions';
  //const model = 'text-davinci-003';
  const model ='gpt-3.5-turbo-instruct';
  const temperature = 1;
  const maxTokens = 256;
  var res = null;

  await axios.post(endpoint, {
    model,
    temperature,
    prompt,
    max_tokens: maxTokens,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => {

      res = response;
    })
    .catch(function (error) {
      if (error.response) {
        res = '408';//El servidor se agotó esperando el resto de la petición del navegador
      } else if (error.request) {
        res = '503';//El servidor no está disponible para manejar esta solicitud en este momen0
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        res = '400';//Mala petición
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

  return res;

  //return response;
}

async function generateCharacterInfo(context, words, iduser) {
  let prompt = 'generate a name for a character';

  const response = await requestByPrompt(prompt);
  var res = null;

  if (response != 503 && response != 400 && response != 408) {
    let name = response.data.choices[0].text;
    name = name.replace('\n', '');

    prompt = `generate a description for ${name} who is related to ${context}\n`;

    const response2 = await requestByPrompt(prompt);

    if (response2 != 503 && response2 != 400 && response2 != 408) {
      let description = response2.data.choices[0].text;
      description = description.replace('\n', '');

      return { name, description };
    }
    else {
      connectionsCtrl.updateConnections(iduser, parseInt(response2, 10), 'generateCharacterInfo-Name');
      return response2;
    }

  } else {
    connectionsCtrl.updateConnections(iduser, parseInt(response, 10), 'generateCharacterInfo-Description');
    return response;
  }


}

async function generateOnePhrase(word, context) {
  const prompt = `generate a phrase that contains the word ${word} and is related to the following topic: ${context} `;

  //const model = 'text-davinci-003';
  const model ='gpt-3.5-turbo-instruct';
  const temperature = 1;
  const maxTokens = 100;
  const endpoint = 'https://api.openai.com/v1/completions';

  /*const response = await axios.post(endpoint, {
    model,
    temperature,
    prompt,
    max_tokens: maxTokens,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  });*/


  var res = null;

  await axios.post(endpoint, {
    model,
    temperature,
    prompt,
    max_tokens: maxTokens,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then((response) => {
      const phrase = response.data.choices[0].text;
      res = phrase;

    })
    .catch(function (error) {
      if (error.response) {
        res = '408';//El servidor se agotó esperando el resto de la petición del navegador
      } else if (error.request) {
        res = '503';//El servidor no está disponible para manejar esta solicitud en este momen0
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        res = '400';//Mala petición
        console.log('Error', error.message);
      }
      //console.log(error.config);
    });

  return res;
}

async function generatePhrasesReq(words, context) {
  console.log("GENERATING PHRASES");
  const phrases = [];
  for (let i = 0; i < words.length; i += 1) {
    const phrase = generateOnePhrase(words[i], context);
    if (phrase != 503 && phrase != 400 && phrase != 408) {
      phrases.push(phrase);
    }
  }

  const solvedphrases = await Promise.all(phrases);

  if (typeof solvedphrases !== 'undefined') {

    if (solvedphrases[0] != 503 && solvedphrases[0] != 400 && solvedphrases[0] != 408) {
      return solvedphrases;
    } else {
      return solvedphrases[0];
    }

  } else {
    return '408';
  }
}

module.exports = {
  generateWordsOpenAi,
  generateCharacterInfo,
  generatePhrasesReq,

};
