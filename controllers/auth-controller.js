var _ = require('lodash');
var queue = require('../workers/queue');

exports.isLoggedIn = function(req, res) {
  if (_.isEmpty(req.user)) { 
    return res.status(200).send(); 
  }

  return res.status(200).send({ session: req.session });
}

exports.login = function(req, res) {
  if (_.isEmpty(req.user.values)) { 
    return res.status(400).send({ error: { message: 'User not found in request.  Please try again.' } }); 
  }

  queue.crawlUser(req.user.values);
  res.clearCookie('user')
  .redirect('/main')
  .status(200)
  .send(req.session.cookie);
}

exports.logout = function(req, res) {
  if (_.isEmpty(req.session)) { 
    return res.status(400).send({ error: { message: 'No session currently active to terminate.' } }); 
  }

  console.log(req.session);
  delete req.session;
  console.log(req.session);
  return res.status(200).send({ success: { message: 'Session destroyed.' } });
}