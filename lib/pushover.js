/**
 * Sends push notifications to iOS and Android using Pushover.net.
 * @module {class} pushover
 * @see https://github.com/dvdln/node-pushover-client
 * @see https://pushover.net/api
 */

'use strict';

var API       = require('./api/pushover-1'),
    validate  = require('./util/validate'),
    request   = require('./util/request'),
    log       = require('./util/log'),
    pkg       = require('../package.json');


/**
 * Pass default data that applies to all notification requests.
 * @param {object} options
 * @class
 * @classdesc Sends push notifications to iOS and Android using Pushover.net
 */
function Pushover(options) {
  this.options = API.parse.options(options);
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
      data    = action.parse.options(options, this.options);

  try {
    validate.parseData(data, action);
    validate.validateData(data, action);
  } catch (err) {
    log.error('Bad data', err);
    return false;
  }

  return request.send(data, action, done);
};


module.exports = Pushover;
