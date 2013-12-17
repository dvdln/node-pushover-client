/**
 * @module api/pushover-1.0.0/validate/send
 * @exports {Function} options
 */

'use strict';


module.exports = {

  /**
   * Validate send data.
   *
   * @throws {Error}
   * @param {Object}
   * @return {Object}
   */
  options: function (options) {
    var data = options.data;

    ['token', 'user', 'message'].forEach(function (key) {
      if (!data[key]) {
        throw new Error('Missing required field: ' + key);
      }
    });

    if (1 < (data.priority || 0)) {
      if (!data.expire || !data.retry) {
        throw new Error('Missing required fields: Expire and retry ' +
            'are required for emergency (priority 2) messages.');
      }
    }

    if (512 < (data.message || '').length + (data.title || '').length) {
      throw new Error('Message, including title, ' +
          'must be under 512 characters.');
    }

    if (500 < (data.url || '').length) {
      throw new Error('URL must be less than 500 characters.');
    }

    if (50 < (data.urlTitle || '')) {
      throw new Error('URL title must be less than 50 characters.');
    }

    return options;
  }
};
