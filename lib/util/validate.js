/**
 * @module util/validate
 * @exports {function} validateData
 * @exports {function} parseData
 */

'use strict';

var _ = require('lodash');


/**
 * @throws {Error}
 * @param {object} data
 * @param {object} action
 * @return {object}
 */
function validateData(data, action) {
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


/**
 * @throws {Error}
 * @param {object} data
 * @param {object} action
 * @return {object}
 */
function parseData(data, action) {
  _.defaults(data, action.defaults);

  if (action.parse.data(data) === false) {
    throw new Error('Failed to parse data');
  }

  return data;
}


module.exports = {
  parseData: parseData,
  validateData: validateData
};
