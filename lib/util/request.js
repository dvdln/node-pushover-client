/**
 * @module util/request
 * @exports {function} send
 */

'use strict';

var Q           = require('q'),
    querystring = require('querystring'),
    defaults    = require('./defaults');


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
 * @return {promise}
 */
function send(data, action) {
  var defer   = Q.defer(),
      query   = querystring.stringify(data),
      options = clientOptions(query, action),
      client  = require(options.client);

  var req = client.request(options, function (res) {
    res.setEncoding(action.endpoint.encoding || 'utf8');

    res.on('data', function (content) {
      var json = action.parse.response(content);

      if (json.success) {
        defer.resolve(json);
      } else {
        defer.reject(json);
      }
    });

    res.on('error', function (err) {
      var json = action.parse.error(err);

      defer.reject(json);
    });
  });

  req.write(query + '\n');
  req.end();

  return defer.promise;
}


module.exports = {
  send: send
};
