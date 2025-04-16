const express = require('express');
const estadisticasCtrl = require('../controllers/estadisticas_controller');

const router = express.Router();

router.post('/estadisticas', estadisticasCtrl.getAll);
router.post('/updateAchievement', estadisticasCtrl.updateAchievement);
router.post('/updateExperience', estadisticasCtrl.updateExperience);

module.exports = router;