/**
 * @module {function} util/callback
 */

'use strict';


/**
 * @param {function} fn
 * @param {...object} data
 */
function callback(fn) {
  var data = [].slice.call(arguments, 1);

  if (typeof fn === 'function') {
    fn.apply(null, data);
  }
}


module.exports = callback;
