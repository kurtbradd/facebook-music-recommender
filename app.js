var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var http = require('http');

var expressConfig = require('./config/expressConfig');
var errorHandlers = require('./config/errorHandlers');

var app = express();
expressConfig.setup(app, express);
errorHandlers.setup(app);

module.exports = app;

// DEBUG=facebook-music-recommender ./bin/www 
// DEBUG=facebook-music-recommender nodemon ./bin/www 
