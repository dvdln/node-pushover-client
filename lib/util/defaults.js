/**
 * @module util/defaults
 */

'use strict';

var _ = require('lodash');


/**
 * Merge initial data and apply default values.
 *
 * @param {...Object} args
 * @param {Object} src
 * @return {Object}
 */
function defaults(/*...args, src*/) {
  var args  = [].slice.call(arguments);
  var src   = args.pop();
  var data  = {};

  _.merge.apply(null, [data].concat(args));

  if (_.isPlainObject(src)) {
    data = _(data)
      .pick(Object.keys(src))
      .defaults(src)
      .omit(_.isNull)
      .value();
  }

  return data;
}


module.exports = defaults;
