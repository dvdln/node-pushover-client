/**
 * @module util/request
 * @exports {function} send
 */

'use strict';

var me          = module.exports,
    querystring = require('querystring'),
    _           = require('lodash');


/**
 * @param {function} fn
 * @param {...object} data
 */
function callback(fn) {
  var data = [].slice.call(arguments, 0);

  if (typeof fn === 'function') {
    fn.apply(null, data);
  }
}


/**
 * @param {string} query
 * @param {object} action
 * @return {object}
 */
function requestOptions(query, action) {
  return _.merge(
    {
      client: 'https',
      hostname: '',
      path: '',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(query)
      }
    },
    action.endpoint
  );
}


/**
 * @param {object} data
 * @param {object} action
 * @return {boolean}
 */
me.send = function (data, action) {
  var query   = querystring.stringify(data || {}),
      options = requestOptions(query, action),
      client  = require(options.client);

  var req = client.request(options, function (res) {
    res.setEncoding(action.endpoint.encoding || 'utf8');

    res.on('data', function (content) {
      callback(data.done, action.parse.response(content));
    });

    res.on('error', function (err) {
      callback(data.done, action.parse.error(err));
    });
  });

  req.write(query + '\n');
  req.end();

  return true;
};
