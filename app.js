var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');

var expressConfig = require('./config/expressConfig');
var passportConfig = require('./config/passportConfig');

var app = express();

expressConfig.setup(app, express);
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/routes.js')(app, passport);

module.exports = app;
