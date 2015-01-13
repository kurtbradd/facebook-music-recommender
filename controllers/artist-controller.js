var model = require('../models/index');
var _ = require('lodash');

/* Retrieves an artist with the given Facebook id number */
exports.getArtist = function(req, res) {
  if (_.isEmpty(req.params.id)) { 
    return res.status(400).send({ error: { message: 'No input identifier given for artist.' } }); 
  }

  if (!(req.params.id == parseInt(req.params.id))) { 
    return res.status(400).send({ error: { message: 'Input identifier is not an integer.' } }); 
  }

  model.Artist.find({ where: { facebookId: req.params.id } })
  .then(function(artist) {
    if (_.isEmpty(artist)) { 
      return res.status(400).send({ error: { message: 'No artist found with given input identifier.' } }); 
    }
    return res.status(200).send({ data: artist.values });
  })

  .catch(function(err) {
    return res.status(400).send(err);
  });
}

/* Retrieves the genre of an artist with the given Facebook id number */
exports.getGenreOfArtist = function(req, res) {
  if (_.isEmpty(req.params.id)) { 
    return res.status(400).send({ error: { message: 'No input identifier given for artist.' } }); 
  }

  if (!(req.params.id == parseInt(req.params.id))) { 
    return res.status(400).send({ error: { message: 'Input identifier is not an integer.' } }); 
  }

  model.Artist.find({ where: { facebookId: req.params.id } })
  .then(function(artist) {
    if (_.isEmpty(artist)) { 
      return res.status(400).send({ error: { message: 'No artist found with given input identifier.' } }); 
    }
    model.Genre.find({ where: { id: artist.values.genre } })
    .then(function(genre) {
      if (_.isEmpty(genre)) { 
        return res.status(200).send({ data: { id: -1, genre: 'None found' } }); 
      }
     return res.status(200).send({ data: genre.values });
    })
    .catch(function(err) {
      return res.status(400).send(err);
    });
  })

  .catch(function(err) {
    return res.status(400).send(err);
  });
}

/* Retrieves the artist recommendations for the user */
exports.getArtistRecommendations = function(req, res) {
  return res.status(200).send('Success');
}