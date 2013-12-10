/**
 * @module api/parser/constructor
 * @exports {function} options
 */

'use strict';

var defaults  = require('../../util/defaults');


module.exports = {

  /**
   * @param {object} data
   * @return {object}
   */
  options: function(data) {
    return defaults(data, {
      token: process.env.PUSHOVER_TOKEN || '',
      user: process.env.PUSHOVER_USER || ''
    });
  }
};
