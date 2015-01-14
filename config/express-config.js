/* 
 * This file exports the configuration Express.js back to the application
 * so that it can be used in other parts of the product.
 */

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

exports.setup = function(app, express) {
  app.set('views', path.join(__dirname + '../../public/views'));
  app.engine('html', require('ejs').renderFile);
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(session({ 
    cookie: { maxAge: (24*3600*1000*30) },
    store: new RedisStore({
      host: 'localhost',
      port: 6379,
      db: 1,
      pass: ''
    }),
    secret: 'mylittlesecret', 
    resave: false, 
    saveUninitialized: false 
  }));

  app.use(express.static(path.join(__dirname + '../../public')));
}