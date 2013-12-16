/**
 * @module util/errors
 * @exports {function} normalize
 */

'use strict';

var _ = require('lodash');


/**
 * @param {object} errors
 * @param {string} join
 * @return {array}
 */
function normalize(errors, join) {
  if (_.isArray(errors)) {
    errors = _.flatten(errors);
  } else {
    errors = [errors];
  }

  errors.forEach(function (item, i) {
    var message = (item instanceof Error) ? item.message : item;

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
