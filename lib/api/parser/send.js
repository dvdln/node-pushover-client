/**
 * @module {object} api/parser/send
 * @exports {function} response
 * @exports {function} error
 * @exports {function} options
 */

'use strict';

var defaults = require('../../util/defaults');


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
   * @param {object} options
   * @param {object} base
   * @return {object}
   */
  options: function (data, base) {
    if (data && data.urlTitle) {
      data.url_title = data.urlTitle;
    }

    return defaults(data, base, {
      token:      '',
      user:       '',
      title:      null,
      message:    '',
      timestamp:  Date.now(),
      priority:   null,
      expire:     null,
      retry:      null,
      device:     null,
      url:        null,
      url_title:  null,
      sound:      null
    });
  },


  /**
   * @param {object}
   * @return {(boolean|string)}
   */
  validate: function (data) {
    if (data.priority > 1) {
      if (!data.expire || !data.retry) {
        return 'Missing fields: expire and retry ' +
            '(required for emergency priority messages).';
      }
    }

    return true;
  }
};