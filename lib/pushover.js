/*jshint node:true */

'use strict';

var API       = require('./api/pushover-1'),
    validate  = require('./util/validate'),
    request   = require('./util/request'),
    log       = require('./util/log'),
    pkg       = require('../package.json'),
    _         = require('lodash');


/**
 * @param {object} data
 */
function Pushover(data) {
  this.data = _.defaults(_.pick(data, Object.keys(API.defaults)), API.defaults);
}


/**
 * @param {object} options
 @ return {boolean}
 */
Pushover.prototype.send = function (options) {
  options = options || {};

  var action = API.action.send,
      data = _.defaults(options, this.data);

  console.log(data);

  try {
    validate.parseData(data, action);
    validate.validateData(data, action);
  } catch (err) {
    log.error('Bad data', err);
    return false;
  }

  return request.send(data, action);
};


Pushover.version = pkg.version;
module.exports = Pushover;
