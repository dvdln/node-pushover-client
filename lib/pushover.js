/*!
 * @see https://github.com/dvdln/node-pushover-client
 * @see https://pushover.net/api
 * @author David Lane <dvdln@live.com>
 * @copyright David Lane 2013
 * @license MIT
 */

/**
 * Sends push notifications to iOS and Android using Pushover.net.
 * @module {class} pushover
 */

'use strict';

var me        = module.exports,
    API       = require('./api/pushover-1'),
    validate  = require('./util/validate'),
    request   = require('./util/request'),
    log       = require('./util/log'),
    pkg       = require('../package.json'),
    _         = require('lodash');


/**
 * Pass default data that applies to all notification requests.
 * @param {object} options
 * @class
 * @classdesc Sends push notifications to iOS and Android using Pushover.net
 */
me = function (options) {
  this.options = _.pick(options || {}, Object.keys(API.defaults));

  _.defaults(this.options, API.defaults);
};


/**
 * npm package version.
 * @constant {string}
 */
me.version = pkg.version;


/**
 * Send a notification.
 * @param {object} options
 * @return {boolean}
 */
me.prototype.send = function (options) {
  options = options || {};

  var action = API.action.send,
      data = _.defaults(options, this.data);

  try {
    validate.parseData(data, action);
    validate.validateData(data, action);
  } catch (err) {
    log.error('Bad data', err);
    return false;
  }

  return request.send(data, action);
};
