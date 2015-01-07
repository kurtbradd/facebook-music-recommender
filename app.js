var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');

var expressConfig = require('./config/express-config');
var passportConfig = require('./config/passport-config');

var app = express();

expressConfig.setup(app, express);
passportConfig(app, passport);

require('./routes/routes.js')(app, passport);

module.exports = app;
