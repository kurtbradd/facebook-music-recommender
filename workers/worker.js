var kue = require('kue');
var helpers = require('./helpers');
var jobs = kue.createQueue();
var model = require('../models/index');

/* Processes the job for crawling the user and entering data into database */
jobs.process('crawlUser', function(job, done) {
  helpers.crawlUser(job, done);
});

/* Processes the job for crawling the genres and entering them into the database */
jobs.process('crawlGenres', function(job, done) {
  model.Artist.findAll({ where: { genre: null }, limit: job.data.limit })
  .then(function(artist) {
    artist.forEach(function(element) {
      helpers.crawlGenre(element)
    });
  })
  .catch(function(err) {
    console.log(err);
  });
  done();
});

