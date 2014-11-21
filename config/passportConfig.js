/* 
 * This file contains all of the Passport configuration that will
 * be used through the application for Facebook authentication.
 */

var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
      clientID        : keys.facebook.APP_ID,
      clientSecret    : keys.facebook.SECRET,
      callbackURL     : 'http://localhost:3000/auth/facebook/callback'
    },
    
    function(req, token, refreshToken, profile, done) {
      process.nextTick(function() {
        return done(null, user);
      });
    }));
}