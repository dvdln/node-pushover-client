/**
 * @module api/pushover-1.0.0/parse/send
 * @exports {Function} response
 * @exports {Function} error
 * @exports {Function} options
 */

'use strict';

var defaults  = require('../../../util/defaults');
var errors    = require('../../../util/errors');


module.exports = {

  /**
   * Parse response data before letting main code interact with it.
   *
   * @param {Object} res
   * @return {Object}
   */
  response: function (res) {
    var json = res.body || {};

    json.success = (res.ok && json.status === 1);

    return json;
  },


  /**
   * Normalize error responses.
   *
   * @param {Object} err
   * @return {Object}
   */
  error: function (err) {
    return {
      status: null,
      errors: errors.normalize(err)
    };
  },


  /**
   * Parse send data.
   *
   * @param {Object} userData
   * @param {Object} baseData
   * @param {Object} action
   * @return {Object}
   */
  options: function (userData, baseData, action) {
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
};
