/**
 * Sends push notifications to iOS and Android using Pushover.net.
 * @module {class} pushover
 * @see https://github.com/dvdln/node-pushover-client
 * @see https://pushover.net/api
 */

'use strict';

var Q         = require('q'),
    API       = require('./api')['pushover-1.0.0'],
    validate  = require('./util/validate'),
    request   = require('./util/request'),
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
 * @return {promise}
 */
Pushover.prototype.send = function (options) {
  var defer   = Q.defer(),
      action  = API.action.send,
      data    = action.parse.options(this.options, options);

  try {
    validate(data, action);

    request.send(data, action).then(
      defer.resolve,
      defer.reject
    );
  } catch (err) {
    defer.reject(action.parse.error(err));
  }

  return defer.promise;
};


module.exports = Pushover;
