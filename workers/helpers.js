var request = require('request');
var model = require('../models/index');
var queue = require ('./queue');

/* Crawls each user for their likes and inserts into the database */
exports.crawlUser = function(job, done) {
  var user = job.data.user;

  if (job.data.facebookUrl) {
    var facebookUrl = job.data.facebookUrl;
  }
  else {
    var facebookUrl = 'https://graph.facebook.com/';
    facebookUrl += user.facebookId;
    facebookUrl += '/music';
    facebookUrl += '?format=json&access_token=';
    facebookUrl += user.v2AccessToken;
  }

  request(facebookUrl, function(error, response, body) {
    var data = JSON.parse(body);
    data.data.forEach(function(artist) {
      crawlArtist(user, artist);
    });
    if (data.paging.next) {
      queue.crawlUserPaging(user, data.paging.next.replace('\\', ''));
    }
  });

  done();
}

/* Adds an artist to the database if no one has liked them before */
function crawlArtist(user, artist) {
  model.Artist.find({ where: { facebookId: artist.id } })
  .then(function(result) {
    if (result === null) {
      model.Artist.create({ facebookId: artist.id })
      .then(function(result) {
        crawlLike(user, result.dataValues);
      })
      .catch(function(err) {
        console.log(err);
      });
    }
    else {
      crawlLike(user, result.dataValues);
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

/* Adds a like to the database if it is not already present */
function crawlLike(user, artist) {
  model.Like.find({ where: { user: user.id, artist: artist.id } })
  .then(function(result) {
    if (result === null) {
      model.Like.create({ user: user.id, artist: artist.id });
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}