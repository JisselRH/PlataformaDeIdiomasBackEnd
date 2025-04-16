const express = require('express');
const speechCtrl = require('../controllers/speech_controller');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/scriptedAssessment', speechCtrl.scriptedAssessment);

router.post('/dialog', speechCtrl.unscriptedAssessment);

module.exports = router;
