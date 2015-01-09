var model = require('../models/index');
var helper = require('../helpers/helpers');
var _ = require('lodash');

/* Returns a list of artists with the given genre (in the query string) */
exports.getArtistsByGenre = function(req, res) {
  var offset = helper.getOffset(req);
  if (_.isEmpty(req.query.genre)) { return res.status(400).send('No parameters given') }
  else {
    model.Genre.findOne({ where: { genre: req.query.genre } })
    .then(function(genre) {
      if (_.isEmpty(genre)) { return res.status(400).send('Genre not found') }
      else {
        model.Artist.findAll({ where: { id: { gt: offset }, genre: genre.values.id }, limit: 20 })
        .then(function(artists) {
          if (_.isEmpty(artists)) { return res.status(400).send('No artist with genre found') }
          else {
            var offset = _.max(artists, function(artist) { return artist.values.id; }).values.id;
            var nextUrl = 'http://localhost:3000/api/genre/artists?genre=' + genre.values.genre + '&offset=' + offset;
            return res.status(200).send({ data: artists, paging: { nextUrl: nextUrl } });
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
  var offset = helper.getOffset(req);
  model.Genre.findAll({ where: { id: { gt: offset } }, limit: 20 })
  .then(function(genres) {
    if (_.isEmpty(genres)) { return res.status(400).send('No genres found') }
    else {
      var offset = _.max(genres, function(genre) { return genre.values.id; }).values.id;
      var nextUrl = 'http://localhost:3000/api/genre?offset=' + offset;
      return res.status(200).send({ data: genres , paging: { nextUrl: nextUrl } });
    }
  })
  .catch(function(err) {
    return res.status(400).send(err);
  });
}