const express = require('express');
const imageCtrl = require('../controllers/images_controller');

const router = express.Router();

router.post('/gen-image', imageCtrl.createImage);

module.exports = router;