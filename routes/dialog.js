const express = require('express');
const dialogCtrl = require('../controllers/dialog_controller');

const router = express.Router();

/* GET users listing. */
router.post('/ask', dialogCtrl.askOpenAI);

router.post('/dialog', dialogCtrl.dialog);

router.post('/check', dialogCtrl.checkObjective);

router.get('/context/:contextId', dialogCtrl.findContext);

router.post('/first-response', dialogCtrl.firstReponse);

module.exports = router;
