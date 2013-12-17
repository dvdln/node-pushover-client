/**
 * Sends push notifications to iOS and Android using Pushover.net.
 *
 * @module pushover
 * @see https://github.com/dvdln/node-pushover-client
 * @see https://pushover.net/api
 */

'use strict';

if (typeof Promise === 'undefined') {
  global.Promise = require('es6-promise').Promise;
}

var rc = require('rc')('pushover', {
  token: process.env.PUSHOVER_TOKEN,
  user: process.env.PUSHOVER_USER
});

var API = require('./api')['pushover-1.0.0'];
var pkg = require('../package.json');


/**
 * @class
 * @classdesc Sends push notifications to iOS and Android using Pushover.net
 *
 * Pass default data that applies to all notification requests.
 *
 * @param {Object} options
 */
function Pushover(options) {
  this.options = API.parse.options(rc, options);
}


/**
 * npm package version.
 *
 * @constant {String}
 */
Pushover.version = pkg.version;


/**
 * Send a notification.
 *
 * @param {Object} options
 * @return {Promise}
 */
Pushover.prototype.send = function (options) {
  var action = API.action.send;

  return Promise.resolve(action.parse.options(options, this.options, action))
    .then(action.validate.options)
    .then(action.request)
    .then(action.parse.response)
    .catch(action.parse.error);
};


module.exports = Pushover;
