/**
 * @module {object} api/pushover
 */

'use strict';

var parse     = require('./parse'),
    validate  = require('./validate');


/**
 * Pushover.net API implementation.
 * @type {object}
 */
module.exports = {
  name: 'Pushover',
  version: '1.0.0',
  parse: parse.constructor,
  action: {
    send: {
      endpoint: {
        url: 'https://api.pushover.net/1/messages.json'
      },
      required: ['token', 'user', 'message'],
      parse: parse.send,
      validate: validate.send
    }
  }
};
