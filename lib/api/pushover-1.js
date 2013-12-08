/*jshint node:true */

'use strict';

var log = require('../util/log');


var parser = {

  /**
   * @param {object} data
   */
  data: function (data) {
    if (data.timestamp === true) {
      data.timestamp = Date.now();
    }

    return data;
  },

  /**
   * @param {object} res
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
  },

  /**
   * @param {object} err
   */
  error: function (err) {
    return {
      status: null,
      error: [new Error(err)]
    };
  }
};


module.exports = {
  name: 'Pushover',
  version: '1',
  defaults: {
    token: process.env.PUSHOVER_DEFAULT_TOKEN || '',
    user: process.env.PUSHOVER_DEFAULT_USER || ''
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
