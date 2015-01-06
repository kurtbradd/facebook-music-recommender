var request = require('request');
var model = require('../models/index');

/* Sets a like in the Like table for a given artist and user (by Facebook ID number) */
exports.likeArtist = function(req, res) {
  if (isNaN(req.params.id)) {
    return res.status(400).send('Bad input: ' + req.params.id);
  }
  else {
    if (!(req.params.id % 1 === 0)) {
      return res.status(400).send('Bad input: ' + req.params.id);
    } 
  }

  model.Artist.find({ where: { facebookId: req.params.id } })
  .then(function(artist) {
    if (artist === null) {
      return res.status(400).send('No artist found: ' + req.params.id);
    } 
    else {
      model.Like.find({ where: { user: req.user.id, artist: req.params.id } })
      .then(function(like) {
        if (like === null) {
          model.Like.create({ user: req.user.id, artist: req.params.id })
          .then(function(like) {
            return res.status(200).send(like);
          })
          .catch(function(err) {
            console.log(err);
            return res.status(400).send(err);
          });
        }
        else {
          return res.status(400).send('Like already in table: ' + like);
        }
      })
      .catch(function(err) {
        console.log(err);
        return res.status(400).send(err);
      });
    }
  })
  .catch(function(err) {
    console.log(err);
    return res.status(400).send(err);
  });
}

/* Retrieves the artist recommendations for the user */
exports.getArtistRecommendations = function(req, res) {
  return res.status(200).send('Success');
}