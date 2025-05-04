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
  // Usa console.error o tu librería de logging (ej: Winston, Pino)
  // Asegúrate de que escriba a stderr
  console.error('FATAL: Excepción no capturada:', err);
  // Opcional: Da tiempo para que el log se escriba antes de salir
  setTimeout(() => {
    process.exit(1);
  }, 1000); // Espera 1 segundo antes de salir
});

process.on('unhandledRejection', (reason, promise) => {
  // Usa console.error o tu librería de logging
  console.error('FATAL: Promesa rechazada no manejada en:', promise, 'razón:', reason);
  // Opcional: Da tiempo para que el log se escriba
  setTimeout(() => {
  process.exit(1); // Salir si se considera un error crítico
   }, 1000);
});

// Otros logs de inicio
console.log('Aplicación Node.js iniciando...');
// Loggea después de configurar servidores, conectar DBs, etc.
console.log('Servidor web configurado.');
// ...

app.use(cors({
  origin: '*',
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true,
// }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const port = 8001;

// app.listen(port, () => {
//   console.log(`Server running on ${port}`)
// })

module.exports = app;
