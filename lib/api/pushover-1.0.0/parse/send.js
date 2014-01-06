/**
 * @module api/pushover-1.0.0/parse/send
 * @exports {Function} response
 * @exports {Function} error
 * @exports {Function} options
 */

'use strict';

var defaults  = require('../../../util/defaults');
var errors    = require('../../../util/errors');


/**
 * Normalize error responses.
 *
 * @param {Object} err
 * @return {Object}
 */
function error(err) {
  return {
    status: null,
    errors: errors.normalize(err)
  };
}


/**
 * Parse response data before letting main code interact with it.
 *
 * @param {Object} res
 * @return {Object}
 */
function response(res) {
  var code = 500;
  var data = {};

  try {
    code = res.statusCode;
    data = JSON.parse(res.body);
  } catch (err) {
    data = error(err);
  } finally {
    data.success = (code === 200 && data.status === 1);
  }

  return data;
}


/**
 * Parse send data.
 *
 * @param {Object} userData
 * @param {Object} baseData
 * @param {Object} action
 * @return {Object}
 */
function options(userData, baseData, action) {
  if (userData) {
    userData.url_title = userData.urlTitle;
  }

  return {
    action: action,
    data: defaults({
      token:      '',
      user:       '',
      message:    '',
      timestamp:  Date.now(),
      title:      null,
      priority:   null,
      expire:     null,
      retry:      null,
      device:     null,
      url:        null,
      url_title:  null,
      sound:      null
    }, userData, baseData)
  };
}


module.exports = {
  response: response,
  error: error,
  options: options
};
