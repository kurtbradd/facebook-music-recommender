var model = require('../models/index');
var _ = require('lodash');

/* Returns a list of artists with the given genre (in the query string) */
exports.getArtistsByGenre = function(req, res) {
  if (_.isEmpty(req.query.genre)) return res.status(400).send('No parameters given');
  else {
    model.Genre.findOne({ where: { genre: req.query.genre } })
    .then(function(genre) {
      if (_.isEmpty(genre)) return res.status(400).send('Genre not found');
      else {
        model.Artist.findAll({ where: { genre: genre.values.id }, limit: 20 })
        .then(function(artists) {
          if (_.isEmpty(artists)) return res.status(400).send('No artist with genre found');
          else {
            return res.status(200).send(artists);
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

/* Gets all of the genres stored in the database */
exports.getGenres = function(req, res) {
  return res.status(200).send('Success');
}