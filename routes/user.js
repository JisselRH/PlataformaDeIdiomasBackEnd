const express = require('express');
const usersCtrl = require('../controllers/users_controller');

const router = express.Router();

router.get('/usuarios', usersCtrl.getUsers);
router.post('/usuario', usersCtrl.getUser);
router.post('/create', usersCtrl.createUser);
router.delete('/delete', usersCtrl.deleteUser);
router.put('/update', usersCtrl.updateUser);
router.post('/login', usersCtrl.login);

module.exports = router;