var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');

var expressConfig = require('./config/expressConfig');
var passportConfig = require('./config/passportConfig');

var app = express();

expressConfig.setup(app, express);
passportConfig(app, passport);

require('./routes/routes.js')(app, passport);

module.exports = app;
