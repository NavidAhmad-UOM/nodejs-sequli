var createError = require('http-errors');
var express = require('express');
var app = express();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var http = require('http');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: 'estatesinn2',
  username: 'postgres',
  password: '12345',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('PostgreSQL Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var port = 3000;
app.set('port', port);
var server = http.createServer(app);

server.listen(port, () => {
  console.log('listening on port: ', port);
});

// server.on('error', onError);
// server.on('listening', onListening);

var indexRouter = require('./routes/index');
var clientsRouter = require('./routes/clients');
var authRouter = require('./routes/auth');
var plotRouter = require('./routes/plots');
var homeRouter = require('./routes/home');
var flatRouter = require('./routes/flat');
var shopRouter = require('./routes/shop');
var userRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
console.log('__dirname',__dirname)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');

  next();
});
app.use('/api', indexRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/auth', authRouter);
app.use('/api/plots',plotRouter);
app.use('/api/homes',homeRouter);
app.use('/api/flats',flatRouter);
app.use('/api/shops',shopRouter);
app.use('/api/users',userRouter);
app.use('/api/upload',uploadRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;