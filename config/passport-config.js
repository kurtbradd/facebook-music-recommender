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

  // Serializes the user for the session based on their ID
  passport.serializeUser(function(user, done) {
    done(null, user.id); 
  });

  // Deserializes the user based on their ID
  passport.deserializeUser(function(id, done) {
    model.User.find({ where: { id: id }})
    .then(function(user) {
      done(null, user.dataValues);
    })
    .catch(function(err) {
      done(err, null);
    });
  });

  // Setup for the Facebook authentication strategy
  passport.use(new FacebookStrategy({
      clientID        : keys.facebook.APP_ID,
      clientSecret    : keys.facebook.SECRET,
      callbackURL     : keys.facebook.CALLBACK
    },
    
    function(accessToken, refreshToken, profile, done) {

      // Performs verification asynchronously
      process.nextTick(function() {

        // Queries the database to see if the user is already stored there
        model.User.find({ where: { facebookId: profile.id }}, {})
        
        .then(function(user) {
          // If the user is not stored in the database, then store the user there
          if (user === null) {
            model.User.create({ facebookId: profile.id, v2AccessToken: accessToken })
            .then(function(user) {
              done(null, user);
            })
            .catch(function(err) {
              done(err, null);
            });
          }

          else {
            // If the user has a new access token, then update the token in the database
            if (user.v2AccessToken !== accessToken) {
              user.updateAttributes({ v2AccessToken: accessToken })
              .then(function() {
                done(null, user);
              });
            } 
            else {
              done(null, user);
            }
          }
        })

        .catch(function(err) {
          done(err, null);
        });

      });
    }
  ));
};