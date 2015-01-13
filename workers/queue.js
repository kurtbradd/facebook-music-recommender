var kue = require('kue');
var jobs = kue.createQueue({ redis: { db: 2 } });

/* Creates job for crawling the initial page of music likes */
exports.crawlUser = function(user) {
  var job = jobs.create('crawlUser', {
    user: user
  })
  .save(function(err) {
    if (err) console.log(err);
  });
};

/* Creates job for crawling subsequent pages of music likes */
exports.crawlUserPaging = function(user, facebookUrl) {
  var job = jobs.create('crawlUser', {
    user: user,
    facebookUrl: facebookUrl
  })
  .save(function(err) {
    if (err) console.log(err);
  });
};

/* Creates a job for crawling for unfound genres in the database */
exports.crawlGenres = function() {
  var job = jobs.create('crawlGenres', {
    limit: 20
  })
  .save(function(err) {
    if (err) console.log(err);
  });
};