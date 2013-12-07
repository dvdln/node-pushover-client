/*jshint node:true */

'use strict';

var querystring = require('querystring'),
    _ = require('lodash');


/**
 * @param {object} data
 * @param {object} action
 * @return {boolean}
 */
function validateData(data, action) {
  action.validators.required.forEach(function (key) {
    if (!data[key]) {
      throw new Error('Missing required field: ' + key);
    }
  });

  return true;
}


/**
 * @param {object} data
 * @param {object} action
 * @return {boolean}
 */
function parseData(data, action) {
  _.defaults(data, action.defaults);

  if (action.parse.data(data) === false) {
    throw new Error('Failed to parse data');
  }

  return true;
}


module.exports = {
  validateData: validateData,
  parseData: parseData
};
