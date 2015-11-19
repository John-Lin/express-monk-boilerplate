'use strict';
let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');

// Database
let mongo = require('mongodb');
let monk = require('monk');
let db = monk('localhost:27017/nodetest2');

let routes = require('./routes/index.js');
let users = require('./routes/user.js');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Make our db accessible to our router
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/api/v1', routes);
app.use('/api/v1/users', users);

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
