/**
 * @module api/parser/constructor
 * @exports {function} options
 */

'use strict';

var defaults  = require('../../util/defaults');


module.exports = {

  /**
   * @param {object} baseOptions
   * @param {object} userOptions
   * @return {object}
   */
  options: function(baseOptions, userOptions) {
    return defaults(baseOptions, userOptions, {
      token: '',
      user: ''
    });
  }
};
