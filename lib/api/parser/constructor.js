/**
 * @module api/parser/constructor
 * @exports {function} options
 */

'use strict';

var defaults  = require('../../util/defaults');


module.exports = {

  /**
   * @param {object} userOptions
   * @param {object} baseOptions
   * @return {object}
   */
  options: function(userOptions, baseOptions) {
    return defaults(userOptions, baseOptions, {
      token: '',
      user: ''
    });
  }
};
