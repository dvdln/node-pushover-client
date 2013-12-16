/**
 * @module {object} api/pushover
 */

'use strict';

var parse     = require('./parse'),
    validate  = require('./validate'),
    request   = require('../../util/request');


/**
 * Pushover.net API implementation.
 * @type {object}
 */
var API = {
  name: 'Pushover',
  version: '1.0.0',
  parse: parse.constructor,
  action: {
    send: {
      endpoint: {
        hostname: 'api.pushover.net',
        path: '/1/messages.json'
      },
      parse: parse.send,
      validate: validate.send,
      request: request.send
    }
  }
};


module.exports = API;
