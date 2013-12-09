/**
 * @module util/log
 * @exports {function} error
 */

'use strict';

var me = module.exports;


/**
 * @param {string} message
 * @param {object} data
 */
me.error = function (message, data) {
  var err = 'unknown error';

  if (data) {
    if (Array.isArray(data)) {
      err = data.join('; ');
    } else if (data.message) {
      err = data.message;
    }
  }

  console.error(['Pushover', message, err].join(': '));
};
