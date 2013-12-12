/**
 * @module {object} api/pushover
 */

'use strict';

var parser = require('./parser');


/**
 * Pushover.net API implementation.
 * @type {object}
 */
module.exports = {
  name: 'Pushover',
  version: '1.0.0',
  parse: parser.constructor,
  action: {
    send: {
      endpoint: {
        hostname: 'api.pushover.net',
        path: '/1/messages.json'
      },
      required: ['token', 'user', 'message'],
      parse: parser.send,
      validate: parser.send.validate
    }
  }
};
