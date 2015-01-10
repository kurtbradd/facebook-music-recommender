var _ = require('lodash');

exports.isLoggedIn = function(req, res) {
  if (_.isEmpty(req.user)) { return res.status(400).send({ error: 'Not logged in' }); }
  else {
    return res.status(200).send({ user: req.user });
  }
}