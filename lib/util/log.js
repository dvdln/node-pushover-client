/*jshint node:true */

'use strict';

var _ = require('lodash');


/**
 * @param {string} message
 * @param {object} data
 */
function error(message, data) {
  var err = 'unknown error';

  if (data) {
    if (_.isArray(data)) {
      err = data.join('; ');
    } else if (data.message) {
      err = data.message;
    }
  }

  console.error(['Pushover', message, err].join(': '));
}


module.exports = {
  error: error
};