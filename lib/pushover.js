/**
 * Sends push notifications to iOS and Android using Pushover.net.
 * @module {class} pushover
 * @see https://github.com/dvdln/node-pushover-client
 * @see https://pushover.net/api
 */

'use strict';

var API       = require('./api/pushover'),
    validate  = require('./util/validate'),
    request   = require('./util/request'),
    callback  = require('./util/callback'),
    pkg       = require('../package.json');

var rc = require('rc')('pushover', {
  token: process.env.PUSHOVER_TOKEN,
  user: process.env.PUSHOVER_USER
});


/**
 * Pass default data that applies to all notification requests.
 * @param {object} options
 * @class
 * @classdesc Sends push notifications to iOS and Android using Pushover.net
 */
function Pushover(options) {
  this.options = API.parse.options(rc, options);
}


/**
 * npm package version.
 * @constant {string}
 */
Pushover.version = pkg.version;


/**
 * Send a notification.
 * @param {object} data
 * @return {boolean}
 */
Pushover.prototype.send = function (options) {
  var action  = API.action.send,
      done    = options.done,
      data    = action.parse.options(this.options, options);

  try {
    validate(data, action);
  } catch (err) {
    callback(done, action.parse.error(err));
    return false;
  }

  return request.send(data, action, done);
};


module.exports = Pushover;
