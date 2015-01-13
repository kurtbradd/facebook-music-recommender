var _ = require('lodash');
var queue = require('../workers/queue');

exports.login = function(req, res) {
  if (_.isEmpty(req.user.values)) { 
    return res.status(400).send({ error: { message: 'User not found in request.  Please try again.' } }); 
  }

  queue.crawlUser(req.user.values);
  res.cookie('user', JSON.stringify({ cookie: req.session.cookie,  accessToken: req.user.values.v2AccessToken, 
                                      id: req.user.values.facebookId }))
  .redirect('/main')
  .status(200)
  .send();
}

exports.logout = function(req, res) {
  if (_.isEmpty(req.user)) { 
    return res.status(400).send({ error: { message: 'No session currently active to terminate.' } }); 
  }

  req.logout();
  return res.clearCookie('user').status(200).send({ success: { message: 'Session destroyed.' } });
}