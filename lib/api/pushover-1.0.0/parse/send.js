/**
 * @module {object} api/parse/send
 * @exports {function} response
 * @exports {function} error
 * @exports {function} options
 */

'use strict';

var defaults  = require('../../../util/defaults'),
    errors    = require('../../../util/errors');


module.exports = {

  /**
   * Parse response data before letting main code interact with it.
   * @param {object} res
   * @return {object}
   */
  response: function (res) {
    var json = JSON.parse(res);

    json.success = (json.status === 1);

    return json;
  },


  /**
   * @param {object} err
   * @return {object}
   */
  error: function (err) {
    return {
      status: null,
      errors: errors.normalize(err)
    };
  },


  /**
   * @param {object} userData
   * @param {object} baseData
   * @param {object} action
   * @return {object}
   */
  options: function (userData, baseData, action) {
    if (userData) {
      userData.url_title = userData.urlTitle;
    }

    return {
      action: action,
      data: defaults(userData, baseData, {
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
      })
    };
  }
};
