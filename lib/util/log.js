/**
 * @module util/log
 * @exports {function} error
 */

'use strict';


/**
 * @param {string} message
 * @param {object} data
 */
function error(message, data) {
  var err = 'unknown error';

  if (data) {
    if (Array.isArray(data)) {
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
