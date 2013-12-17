/**
 * @module api/pushover-1.0.0/parse/constructor
 * @exports {Function} options
 */

'use strict';

var defaults  = require('../../../util/defaults');


module.exports = {

  /**
   * Parse constructor data.
   *
   * @param {Object} baseData
   * @param {Object} userData
   * @return {Object}
   */
  options: function(baseData, userData) {
    return defaults({
      token: '',
      user: ''
    }, baseData, userData);
  }
};
