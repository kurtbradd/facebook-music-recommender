var model = require('../models/index');
var helper = require('../helpers/helpers');
var _ = require('lodash');

/* Returns a list of artists with the given genre (in the query string) */
exports.getArtistsByGenre = function(req, res) {
  var offset = helper.getOffset(req);
  if (_.isEmpty(req.query.genre)) { 
    return res.status(400).send({ error: { message: 'Input genre query not provided.' } }); 
  }

  model.Genre.findOne({ where: { genre: req.query.genre } })
  .then(function(genre) {
    if (_.isEmpty(genre)) { 
      return res.status(400).send({ error: { message: 'Input genre query not found in database.' } });
    }
    model.Artist.findAll({ where: { id: { gt: offset }, genre: genre.values.id }, limit: 20 })
    .then(function(artists) {
      if (_.isEmpty(artists)) { 
        return res.status(200).send({ data: {}, paging: {} }); 
      }
      return res.status(200).send({ 
        data: artists, 
        paging: { nextUrl: 'http://localhost:3000/api/genre/artists?genre=' + genre.values.genre + 
                           '&offset=' + helper.calculateOffset(artists) } 
      });
    })
    .catch(function(err) {
      return res.status(400).send(err);
    });
  })

  .catch(function(err) {
    return res.status(400).send(err);
  });
}

/* Gets all of the genres stored in the database */
exports.getGenres = function(req, res) {
  var offset = helper.getOffset(req);

  model.Genre.findAll({ where: { id: { gt: offset } }, limit: 20 })
  .then(function(genres) {
    if (_.isEmpty(genres)) { 
      return res.status(400).send({ data: {}, paging: {} }); 
    }
    return res.status(200).send({ 
      data: genres, 
      paging: { nextUrl: 'http://localhost:3000/api/genre?offset=' + helper.calculateOffset(genres) } 
    });
  })

  .catch(function(err) {
    return res.status(400).send(err);
  });
}