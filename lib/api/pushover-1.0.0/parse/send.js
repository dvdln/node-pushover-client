/**
 * @module {object} api/parse/send
 * @exports {function} response
 * @exports {function} error
 * @exports {function} options
 */

'use strict';

var defaults = require('../../../util/defaults');


module.exports = {

  /**
   * Parse response data before letting main code interact with it.
   * @param {object} res
   * @return {?object}
   */
  response: function (res) {
    var json;

    try {
      json = JSON.parse(res);
    } catch (err) {
      json = this.error(err);
    }

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
      error: [new Error(err)]
    };
  },


  /**
   * @param {object} baseOptions
   * @param {object} userOptions
   * @return {object}
   */
  options: function (baseOptions, userOptions) {
    if (userOptions) {
      userOptions.url_title = userOptions.urlTitle;
    }

    return defaults(baseOptions, userOptions, {
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
    });
  }
};
