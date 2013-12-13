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
    if (data.priority > 1) {
      if (!data.expire || !data.retry) {
        return 'Missing fields: expire and retry ' +
            '(required for emergency priority messages).';
      }
    }

    return true;
  }
};
