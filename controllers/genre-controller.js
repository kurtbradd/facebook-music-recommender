var model = require('../models/index');

/* Returns a list of artists with the given genre (in the query string) */
exports.getArtistsByGenre = function(req, res) {
  return res.status(200).send('Success');
}

/* Gets all of the genres stored in the database */
exports.getGenres = function(req, res) {
  return res.status(200).send('Success');
}