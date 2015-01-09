var kue = require('kue');
var jobs = kue.createQueue();

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