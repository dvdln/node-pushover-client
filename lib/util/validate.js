/**
 * @module {function} util/validate
 */

'use strict';


/**
 * @throws {Error}
 * @param {object} data
 * @param {object} action
 * @return {object}
 */
function validate(data, action) {
  action.validators.required.forEach(function (key) {
    if (!data[key]) {
      throw new Error('Missing required field: ' + key);
    }
  });

  if (typeof action.validators.custom === 'function') {
    var result = action.validators.custom(data);

    if (result !== true) {
      throw new Error(result);
    }
  }

  return data;
}


module.exports = validate;
