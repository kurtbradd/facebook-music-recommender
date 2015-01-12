var _ = require('lodash');

/* Checks the request for an offset, if there is no offset then the offset is 0 */
exports.getOffset = function(req) {
  if (!_.isEmpty(req.query.offset)) {
    if (req.query.offset == parseInt(req.query.offset)) { return req.query.offset }
  }
  return 0;
}