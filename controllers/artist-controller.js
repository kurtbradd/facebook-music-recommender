var model = require('../models/index');

/* Sets a like in the Like table for a given artist and user (by Facebook ID number) */
exports.likeArtist = function(req, res) {
  if (!req.user) return res.status(400).send('Not logged in');

  var facebookId = req.params.id;
  model.Artist.find({ where: { facebookId: facebookId } })
  .then(function(result) {
    if (result === null) {
      return res.status(400).send('No artist found');
    }
    else {
      model.Like.findOrCreate({ where: { user: req.user.id, artist: result.values.id } })
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

/* Retrieves the artist recommendations for the user */
exports.getArtistRecommendations = function(req, res) {
  return res.status(200).send('Success');
}