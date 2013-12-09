/**
 * @module util/validate
 * @exports {function} validateData
 * @exports {function} parseData
 */

'use strict';

var me          = module.exports,
    querystring = require('querystring'),
    _           = require('lodash');


/**
 * @throws {Error}
 * @param {object} data
 * @param {object} action
 * @return {boolean}
 */
me.validateData = function (data, action) {
  action.validators.required.forEach(function (key) {
    if (!data[key]) {
      throw new Error('Missing required field: ' + key);
    }
  });

  return true;
};


/**
 * @throws {Error}
 * @param {object} data
 * @param {object} action
 * @return {boolean}
 */
me.parseData = function (data, action) {
  _.defaults(data, action.defaults);

  if (action.parse.data(data) === false) {
    throw new Error('Failed to parse data');
  }

  return true;
};
