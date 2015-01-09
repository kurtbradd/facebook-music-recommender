var kue = require('kue');
var helpers = require('./helpers');
var jobs = kue.createQueue();

/* Processes the job for crawling the user and entering data into database */
jobs.process('crawlUser', function(job, done) {
  helpers.crawlUser(job, done);
});

