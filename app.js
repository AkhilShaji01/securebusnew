var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql=require('mysql');
var bodyParser = require('body-parser')
var hbs=require('express-handlebars');
//var fileUpload=require('express-fileupload');
var session=require('express-session');
var db=require('./config/connection')
const handlebarHelper=require('./config/handlebar-helper')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sadminRouter = require('./routes/sadmin');
// var teacherRouter = require('./routes/teacher');

var instadminRouter=require('./routes/inst');
// var studentRouter=require('./routes/student')
// var driverRouter=require('./routes/driver');
// var nodemcuRouter=require('./routes/node');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"Key",cookie:{maxAge:2592000000}}))
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sadmin', sadminRouter)
// app.use('/superadmin',superadminRouter);
//app.use('/sadmin', sadminRouter);
// app.use('/teacher',teacherRouter);

app.use('/inst',instadminRouter)
// app.use('/student',studentRouter);
// app.use('/driver',driverRouter);
// app.use('/nodemcu',nodemcuRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
