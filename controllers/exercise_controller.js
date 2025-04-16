const {
  generateWordsOpenAi,
  generateCharacterInfo,
  generatePhrasesReq,
} = require('../helpers/exercise');

const { imageReq } = require('../helpers/image-helper');

const db = require('../models/index');

const { Exercise } = require('../models');

const connectionsCtrl = require('../controllers/connections_controller');

// console.log(db);

async function generateWords(req, res) {
  console.log(" generateWords backend");

  const { context, iduser } = req.body;

  const words = await generateWordsOpenAi(context);

  console.log(" words ", words);

  if (words != 503 && words != 400 && words != 408) {
    connectionsCtrl.updateConnections(iduser, 200, 'generateWords');
    res.status(200).json({ words });

  } else {

    connectionsCtrl.updateConnections(iduser, parseInt(words, 10), 'generateWords');
    
    res.status(parseInt(words, 10)).send('Error ' + words);
  }

  //res.status(200).json({ words });
}

async function generateCharacter(req, res) {
  const { context } = req.body;
  const { words } = req.body;
  const { iduser } = req.body;

  console.log(context);
  console.log(words);

  if (!words || !context) {
    res.status(400).json({ error: 'words and context are required' });
    connectionsCtrl.updateConnections(iduser, 400, 'generateCharacter');
  }
  const characterInfo = await generateCharacterInfo(context, words, iduser);

  if (characterInfo != 503 && characterInfo != 400 && characterInfo != 408) {

    const url = await imageReq(characterInfo.description);

    if (url != 503 && url != 400 && url != 408) {
      characterInfo.image = url;

      console.log(characterInfo);

      connectionsCtrl.updateConnections(iduser, 200, 'generateCharacter');

      res.status(200).json(characterInfo);

    } else {
      connectionsCtrl.updateConnections(iduser, parseInt(url, 10), 'generateCharacter');
      res.status(parseInt(url, 10)).send('Error ' + url);
    }

  } else {

    connectionsCtrl.updateConnections(iduser, parseInt(characterInfo, 10), 'generateCharacter');
    res.status(parseInt(characterInfo, 10)).send('Error ' + characterInfo);
  }


}

async function generatePhrases(req, res) {
  const { context } = req.body;
  const { words } = req.body;
  const { iduser } = req.body;

  const phrases = await generatePhrasesReq(words, context);

  if (phrases != 503 && phrases != 400 && phrases != 408) {
    connectionsCtrl.updateConnections(iduser, 200, 'generatePhrases');
    res.status(200).json({ phrases });
  }
  else{
    connectionsCtrl.updateConnections(iduser, parseInt(phrases, 10), 'generatePhrases');
    res.status(parseInt(phrases, 10)).send('Error ' + phrases);
  }

}

//para guardar ejercicio en bd
async function createExercise(req, res) {
  const {
    context, words, characterName, characterDescription
  } = req.body;

  console.log(words);

  try {
    Exercise.create({
      context, words, characterName, characterDescription,
    });


    res.status(200).json({ message: 'Exercise created' });

  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
  }
}

//para cargar todos los ejercicios guardados en bd
async function getExercises(req, res) {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json({ exercises });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

module.exports = {
  generateWords,
  generateCharacter,
  generatePhrases,
  createExercise,
  getExercises,
};
