/**
 * @module {object} api/pushover-1
 */

'use strict';

var me    = module.exports,
    log   = require('../util/log');


/**
 * Collection of data parsing functions.
 * @type {object}
 */
var parser = {

  /**
   * Parse send data before sending it to the server.
   * @param {object} data
   * @return {object}
   */
  data: function (data) {
    if (data.timestamp === true) {
      data.timestamp = Date.now();
    }

    return data;
  },

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

    if (json.status !== 1) {
      log.error('Request failed', json.errors);
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
  }
};


/**
 * Pushover.net API implementation.
 * @type {object}
 */
me = {
  name: 'Pushover',
  version: '1',
  defaults: {
    token: '',
    user: ''
  },
  action: {
    send: {
      endpoint: {
        hostname: 'api.pushover.net',
        path: '/1/messages.json'
      },
      defaults: {
        timestamp: true,
        priority: 0,
        message: ''
      },
      validators: {
        required: ['token', 'user', 'message']
      },
      parse: parser
    }
  }
};
