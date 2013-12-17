/**
 * @module util/request
 * @exports {Function} send
 */

'use strict';

var request = require('superagent');

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
    var contentType = (options.json === true)
        ? 'application/json'
        : 'application/x-www-form-urlencoded';

    request
      .post(options.action.url)
      .send(options.data)
      .set('Content-Type', contentType)
      .end(function (err, res) {
        return (err)
            ? reject(err)
            : resolve(res);
      });
  });
}


module.exports = {
  send: send
};
