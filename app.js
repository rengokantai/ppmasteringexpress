var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nconf = require('nconf');
var winston = require('winston');
var nunjucks = require('nunjucks');




//winston.add(winston.transports.Mail,{
//  "to":"",
//  "username":"",
//  "password":"",
//  "level":"error"
//})

var routes = require('./routes/index');
var users = require('./routes/users');
var popular = require('./routes/popular');
var app = express();


nunjucks.configure('views',{
  autoescape:true,
  express:app
})



//nconf.overrides({
//  "http":{
//    "port":9000
//  }
//});

nconf.argv({
  'p':{
    'alias':'http:port',
    'describe':'listening'
  }
});

nconf.defaults({
  "http":{
    "port":3000
  }
});

//winston.info('debugging');
winston.add(winston.transports.File,{"filename":"error.log","level":"error"})

var customLevels ={
  "low":1,
  "high":2
}

var customLevelLogger = new (winston.Logger)({
  "levels":customLevels,
  "transports":[new winston.transports.Console({"level":"low"})]
});
//winston.error("errortest");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/popular', popular);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
