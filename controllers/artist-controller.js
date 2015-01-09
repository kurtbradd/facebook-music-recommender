var model = require('../models/index');

/* Sets a like in the Like table for a given artist and user (by Facebook ID number) */
exports.likeArtist = function(req, res) {
  return res.status(200).send('Success');
}

/* Retrieves the artist recommendations for the user */
exports.getArtistRecommendations = function(req, res) {
  return res.status(200).send('Success');
}