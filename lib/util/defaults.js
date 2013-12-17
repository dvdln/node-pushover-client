/**
 * @module util/defaults
 */

'use strict';

var _ = require('lodash');


/**
 * Merge initial data and apply default values.
 *
 * @param {Object} src
 * @param {...Object} init
 * @return {Object}
 */
function defaults(src/*, ...init*/) {
  var init = [].slice.call(arguments, 1);
  var data = {};

  _.merge.apply(null, [data].concat(init));

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
