/**
 * @module util/request
 * @exports {function} send
 */

'use strict';

var Q           = require('q'),
    https       = require('https'),
    querystring = require('querystring'),
    defaults    = require('./defaults');


/**
 * @param {object} options
 * @return {object}
 */
function getData(options) {
  var query = querystring.stringify(options.data);

  var endpoint = defaults(options.action.endpoint, {
    encoding:   'utf8',
    hostname:   '',
    path:       '',
    method:     'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(query)
    }
  });

  return {
    query: query,
    endpoint: endpoint
  };
}


/**
 * @param {object} options
 * @return {promise}
 */
function send(options) {
  var defer = Q.defer();
  var data  = getData(options);

  var req = https.request(data.endpoint, function (res) {
    var body = '';

    res.setEncoding(data.endpoint.encoding);

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('error', function (err) {
      defer.reject(err);
    });

    res.on('end', function () {
      defer.resolve(body);
    });
  });

  req.write(data.query + '\n');
  req.end();

  return defer.promise;
}


module.exports = {
  send: send
};
