/* 
 * This file contains all of the Passport configuration that will
 * be used through the application for Facebook authentication.
 */

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys');