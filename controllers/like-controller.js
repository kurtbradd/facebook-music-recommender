var model = require('../models/index');
var helper = require('../helpers/helpers');
var _ = require('lodash');

/* Sets a like in the Like table for a given artist and user (by Facebook ID number) */
exports.setLike = function(req, res) {
  if (_.isEmpty(req.user)) { 
    return res.status(400).send({ error: { message: 'Currently not signed in.' } }); 
  }

  model.Artist.find({ where: { facebookId: req.params.id } })
  .then(function(artist) {
    if (_.isEmpty(artist)) { 
      return res.status(400).send({ error: { message: 'No artist found with given input identifier.' } }); 
    }
    model.Like.findOrCreate({ where: { user: req.user.id, artist: artist.values.id } })
    .spread(function(user, created) {
      return res.status(200).send({ data: user.values });
    })
    .catch(function(err) {
      return res.status(400).send(err);
    });
  })

  .catch(function(err) {
    return res.status(400).send(err);
  });
}

/* Gets all of the likes for the current logged in user (20 per request) */
exports.getLikes = function(req, res) {
  var offset = helper.getOffset(req);
  if (_.isEmpty(req.user)) { 
    return res.status(400).send({ error: { message: 'Currently not signed in.' } }); 
  }

  model.Like.findAll({ where: { id: { gt: offset }, user: req.user.id }, limit: 20 })
  .then(function(likes) {
    if (_.isEmpty(likes)) { 
      return res.status(200).send({ data: {}, paging: {} }); 
    }
    return res.status(200).send({ 
      data: likes, 
      paging: { nextUrl: 'http://localhost:3000/api/like?offset=' + helper.calculateOffset(likes) } 
    });
  })

  .catch(function(err) {
    return res.status(400).send(err);
  });
}