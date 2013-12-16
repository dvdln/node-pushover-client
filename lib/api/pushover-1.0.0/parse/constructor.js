/**
 * @module api/parse/constructor
 * @exports {function} options
 */

'use strict';

var defaults  = require('../../../util/defaults');


module.exports = {

  /**
   * @param {object} baseData
   * @param {object} userData
   * @return {object}
   */
  options: function(baseData, userData) {
    return defaults(baseData, userData, {
      token: '',
      user: ''
    });
  }
};
