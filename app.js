const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

process.on('uncaughtException', (err) => {
  console.error('FATAL: Excepción no capturada:', err);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('FATAL: Promesa rechazada no manejada en:', promise, 'razón:', reason);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});


// --- Logs de inicio ---
console.log('Aplicación Node.js iniciando...');

app.use(cors({
  origin: '*',
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
e
  res.status(err.status || 500);
  res.render('error');
});


const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});


// module.exports = app;
