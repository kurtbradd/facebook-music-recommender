var _ = require('lodash');

/* Checks the request for an offset, if there is no offset then the offset is 0 */
exports.getOffset = function(req) {
  if (!_.isEmpty(req.query.offset)) {
    if (req.query.offset == parseInt(req.query.offset)) { 
      return req.query.offset 
    }
  }

  return 0;
}

exports.calculateOffset = function(object) {
  if (_.isEmpty(object)) { 
    return; 
  }

  return _.max(object, 
    function(element) { 
      return element.values.id 
    }
  ).values.id;
}