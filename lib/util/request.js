/**
 * @module util/request
 * @exports {function} send
 */

'use strict';

var querystring = require('querystring'),
    defaults    = require('./defaults'),
    callback    = require('./callback');


/**
 * @param {string} query
 * @param {object} action
 * @return {object}
 */
function clientOptions(query, action) {
  return defaults(action.endpoint, {
    client:     'https',
    hostname:   '',
    path:       '',
    method:     'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(query)
    }
  });
}


/**
 * @param {object} data
 * @param {object} action
 * @param {function} done
 * @return {boolean}
 */
function send(data, action, done) {
  var query   = querystring.stringify(data),
      options = clientOptions(query, action),
      client  = require(options.client);

  var req = client.request(options, function (res) {
    res.setEncoding(action.endpoint.encoding || 'utf8');

    res.on('data', function (content) {
      callback(done, action.parse.response(content));
    });

    res.on('error', function (err) {
      callback(done, action.parse.error(err));
    });
  });

  req.write(query + '\n');
  req.end();

  return true;
}


module.exports = {
  send: send
};
