/**
 * @module util/request
 * @exports {Function} send
 */

'use strict';

var request = require('request');

if (typeof Promise === 'undefined') {
  global.Promise = require('es6-promise').Promise;
}


/**
 * Send http request.
 *
 * @param {Object} options
 * @return {Promise}
 */
function send(options) {
  return new Promise(function (resolve, reject) {
    var data = {
      url: options.action.url,
      form: options.data
    };

    request.post(data, function (err, res) {
      return (err)
          ? reject(err)
          : resolve(res);
    });
  });
}


module.exports = {
  send: send
};
