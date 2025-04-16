const express = require('express');

const router = express.Router();

const connectionsCtrl = require('../controllers/connections_controller');

router.get('/', function (req, res) {

  res.render('login', { title: 'Plataforma de idiomas' });

});

/*router.get('/connections', (req, res) => {
  res.render('connections', { title: 'Plataforma de idiomas', connects: connectionsCtrl.readConnections() });
});*/


module.exports = router;