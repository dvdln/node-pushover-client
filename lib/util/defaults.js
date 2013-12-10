/**
 * @module {function} util/defaults
 */

'use strict';

var _ = require('lodash');


/**
 * @param {...object} data
 * @param {object} src
 */
function defaults() {
  var args  = [].slice.call(arguments),
      src   = args.pop(),
      data  = _.merge.apply(null, args) || {};

  if (_.isPlainObject(src)) {
    data = _.pick(data, Object.keys(src));
    data = _.defaults(data, src);
    data = _.omit(data, _.isNull);
  }

  return data;
}


module.exports = defaults;
