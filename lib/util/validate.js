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
  action.required.forEach(function (key) {
    if (!data[key]) {
      throw new Error('Missing required field: ' + key);
    }
  });

  var validation = action.validate.options(data);

  if (validation !== true) {
    throw new Error(validation);
  }

  return data;
}


module.exports = validate;
