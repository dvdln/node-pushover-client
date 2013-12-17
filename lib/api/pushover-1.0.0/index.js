/**
 * @module api/pushover-1.0.0
 */

'use strict';

var parse     = require('./parse');
var validate  = require('./validate');
var request   = require('../../util/request');


/**
 * Pushover.net API implementation.
 *
 * @type {Object}
 */
var API = {
  name: 'Pushover',
  version: '1.0.0',
  parse: parse.constructor,
  action: {
    send: {
      url: 'https://api.pushover.net/1/messages.json',
      parse: parse.send,
      validate: validate.send,
      request: request.send
    }
  }
};


module.exports = API;
