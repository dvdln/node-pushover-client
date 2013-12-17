/**
 * @module util/errors
 * @exports {Function} normalize
 */

'use strict';

var _ = require('lodash');


/**
 * Normalize errors to always be an array of strings.
 *
 * @param {Object} errors
 * @param {String} join
 * @return {Array}
 */
function normalize(errors, join) {
  errors = (_.isArray(errors))
      ? _.flatten(errors)
      : [errors];

  errors.forEach(function (item, i) {
    var message = (item instanceof Error)
        ? item.message
        : item;

    errors[i] = message || 'Unknown error';
  });

  if (join) {
    errors = errors.join(join);
  }

  return errors;
}


module.exports = {
  normalize: normalize
};
