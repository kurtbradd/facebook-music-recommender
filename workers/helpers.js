var request = require('request');
var _ = require('lodash');
var model = require('../models/index');
var queue = require ('./queue');
var keys = require('../config/keys');

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

  queue.crawlGenres();
  queue.crawlImages();
  done();
}

/* Crawls for artist Facebook cover photos and stores them in database */
exports.crawlImages = function(job, done) {
  model.Artist.findAll({ where: { picture: null }, limit: job.data.limit })
  .then(function(artists) {
    artists.forEach(function(artist) {
      if (artist) {
        var facebookUrl = 'https://graph.facebook.com/' + artist.dataValues.facebookId;
        request.get(facebookUrl, function(error, response, body) {
          var data = JSON.parse(body);
          if (data.cover && data.cover.source) {
            artist.updateAttributes({ picture: data.cover.source });
          }
          else {
            artist.updateAttributes({ picture: 'None' });
          }
        });
      }
    });
  })
  .catch(function(err) {
    console.log(err);
  });
  done();
}

/* Adds a genre to the database if it is not already present */
exports.crawlGenre = function(artist, done) {
  var echonestUrl = 'http://developer.echonest.com/api/v4/artist/genres?api_key=';
  echonestUrl += keys.echonest.APP_ID;
  echonestUrl += '&id=facebook:artist:';
  echonestUrl += artist.dataValues.facebookId;
  echonestUrl += '&format=json';

  request(echonestUrl, function(error, response, body) {
    var data = JSON.parse(body);
    if (data.response.status.code === 5) {
      artist.updateAttributes({ genre: -1 });
    }
    else if (data.response.terms) {
      model.Genre.findOrCreate({ where: { genre: data.response.terms.genre } })
      .spread(function(genre, created) {
        artist.updateAttributes({ genre: genre.dataValues.id });
      })
      .catch(function(err) {
        console.log(err)
      });
    }
  });
}

/* Adds an artist to the database if no one has liked them before */
function crawlArtist(user, artist) {
  model.Artist.find({ where: { facebookId: artist.id } })
  .then(function(result) {
    if (_.isEmpty(result)) {
      model.Artist.create({ name: artist.name, facebookId: artist.id })
      .then(function(result) {
        crawlLike(user, result.values);
      })
      .catch(function(err) {
        console.log(err);
      });
    }
    else {
      crawlLike(user, result.values);
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}

/* Adds a like to the database if it is not already present */
function crawlLike(user, artist) {
  model.Like.find({ where: { user: user.id, artist: artist.id } })
  .then(function(like) {
    if (_.isEmpty(like)) {
      model.Like.create({ user: user.id, artist: artist.id });
    }
  })
  .catch(function(err) {
    console.log(err);
  });
}