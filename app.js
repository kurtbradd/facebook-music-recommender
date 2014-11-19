var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var expressConfig = require('./config/expressConfig');
var errorHandlers = require('./config/errorHandlers');

var http = require('http');
var app = express();
expressConfig.setup(app, express);
errorHandlers.setup(app);

module.exports = app;
