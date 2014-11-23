/* 
 * This file contains all of the Passport configuration that will
 * be used through the application for Facebook authentication.
 */

var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys');
var model = require('../models/index');

module.exports = function(app, passport) {

  app.use(passport.initialize());
  app.use(passport.session());

	passport.use(new FacebookStrategy({
			clientID        : keys.facebook.APP_ID,
			clientSecret    : keys.facebook.SECRET,
			callbackURL     : 'http://localhost:3000/auth/facebook/callback'
		},
		
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function() {

        model['User'].findOne({ where: { facebookId: profile.id }}, {})
        .then(function(result) {
          if (!result) {
            model['User'].create({ facebookId: profile.id, v2AccessToken: accessToken });
          }
        })

			});
		})
  );
}