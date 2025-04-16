const express = require('express');

const exerciseCtrl = require('../controllers/exercise_controller');

const router = express.Router();

router.post('/gen-words', exerciseCtrl.generateWords);

router.post('/gen-character', exerciseCtrl.generateCharacter);

router.post('/gen-phrases', exerciseCtrl.generatePhrases);

router.post('/create', exerciseCtrl.createExercise);

router.get('', exerciseCtrl.getExercises);

module.exports = router;
