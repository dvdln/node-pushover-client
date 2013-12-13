/**
 * @module {object} api/validate/send
 * @exports {function} options
 */

'use strict';


module.exports = {

  /**
   * @param {object}
   * @return {(boolean|string)}
   */
  options: function (data) {
    if (1 < (data.priority || 0)) {
      if (!data.expire || !data.retry) {
        return 'Missing fields: Expire and retry ' +
            'are required for emergency (priority 2) messages.';
      }
    }

    if (512 < (data.message || '').length + (data.title || '').length) {
      return 'Message, including title, must be under 512 characters.';
    }

    if (500 < (data.url || '').length) {
      return 'URL must be less than 500 characters.';
    }

    if (50 < (data.urlTitle || '')) {
      return 'URL title must be less than 50 characters.';
    }

    return true;
  }
};
