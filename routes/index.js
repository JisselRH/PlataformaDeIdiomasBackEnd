const express = require('express');

const exerciseRouter = require('./exercise');
const tokenRouter = require('./token');
const speechRouter = require('./speech');
const dialogRouter = require('./dialog');
const userRouter = require('./user');
const estadisticasRouter = require('./estadisticas');
const imageRouter = require('./image');
const loginRouter = require('./login');

const router = express.Router();

/* GET login page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
}); 


router.use('/token', tokenRouter);
router.use('/speech', speechRouter);
router.use('/dialog', dialogRouter);
router.use('/user', userRouter);
router.use('/estadisticas', estadisticasRouter);
router.use('/exercise', exerciseRouter);
router.use('/image', imageRouter);
router.use('/login', loginRouter);

module.exports = router;
