var model = require('../models/index');
var _ = require('lodash');

/* Sets a like in the Like table for a given artist and user (by Facebook ID number) */
exports.likeArtist = function(req, res) {
  if (_.isEmpty(req.user)) { return res.status(400).send({ error: 'Not currently logged in' }); }
  model.Artist.find({ where: { facebookId: req.params.id } })
  .then(function(artist) {
    if (_.isEmpty(artist)) { return res.status(400).send({ error: 'No artist found' }); }
    else {
      model.Like.findOrCreate({ where: { user: req.user.id, artist: artist.values.id } })
      .spread(function(user, created) {
        return res.status(200).send(user.values);
      })
      .catch(function(err) {
        return res.status(400).send(err);
      });
    }
  })
  .catch(function(err) {
    return res.status(400).send(err);
  });
}

/* Retrieves an artist with the given Facebook id number */
exports.getArtist = function(req, res) {
  if (_.isEmpty(req.params.id)) { return res.status(400).send({ error: 'No Facebook id provided' }); }
  else {
    if (!(req.params.id == parseInt(req.params.id))) { 
      return res.status(400).send({ error: 'Artist Facebook id is not valid' }); 
    }
    else {
      model.Artist.find({ where: { facebookId: req.params.id } })
      .then(function(artist) {
        if (_.isEmpty(artist)) { return res.status(400).send({ error: 'No artist found with this Facebook id' }); }
        else {
          return res.status(200).send(artist.values);
        }
      })
      .catch(function(err) {
        return res.status(400).send(err);
      });
    }
  }
}

/* Retrieves the genre of an artist with the given Facebook id number */
exports.getGenreOfArtist = function(req, res) {
  if (_.isEmpty(req.params.id)) { return res.status(400).send({ error: 'No Facebook id provided' }); }
  else {
    if (!(req.params.id == parseInt(req.params.id))) {
      return res.status(400).send({ error: 'Artist Facebook id is not valid ' });
    }
    else {
      model.Artist.find({ where: { facebookId: req.params.id } })
      .then(function(artist) {
        if (_.isEmpty(artist)) { return res.status(400).send({ error: 'No artist found with this Facebook id' }); }
        else {
          model.Genre.find({ where: { id: artist.values.genre } })
          .then(function(genre) {
            if (_.isEmpty(genre)) { return res.status(200).send({ error: 'No genre is stored for this artist at this time' }); }
            else {
              return res.status(200).send(genre.values);
            }
          })
          .catch(function(err) {
            return res.status(400).send(err);
          });
        }
      })
      .catch(function(err) {
        return res.status(400).send(err);
      });
    }
  }
}

/* Retrieves the artist recommendations for the user */
exports.getArtistRecommendations = function(req, res) {
  return res.status(200).send('Success');
}