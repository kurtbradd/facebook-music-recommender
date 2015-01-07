/* 
 * This file exports the configuration Express.js back to the application
 * so that it can be used in other parts of the product.
 */

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

exports.setup = function(app, express) {
  app.set('views', 'public/views');
  app.engine('html', require('ejs').renderFile);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({ secret: 'mylittlesecret' , resave: false, saveUninitialized: false }));
  app.use(cookieParser());
  app.use(express.static('./public'));
}