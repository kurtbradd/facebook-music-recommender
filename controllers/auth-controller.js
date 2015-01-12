var _ = require('lodash');

exports.isLoggedIn = function(req, res) {
  if (_.isEmpty(req.user)) { return res.status(200).send({ error: 'Not logged in' }); }
  else {
    return res.status(200).send({ session: req.session });
  }
}