const express = require('express');
const tokenCtrl = require('../controllers/token_controller');

const router = express.Router();

router.get('/get-speech-token', tokenCtrl.getSpeechToken);

module.exports = router;