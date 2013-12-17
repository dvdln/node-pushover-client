'use strict';

var request = require('superagent');


// Mock object
var mock = {
  data: null,

  reset: function () {
    this.data = {
      url: null,
      payload: null,
      headers: {},
      errors: null,
      response: {
        ok: true,
        text: '',
        body: {}
      }
    };
  },

  setResponseBody: function (response) {
    this.data.response.body = response;
  }
};


// Override request methods

/**
 * @param {string} url
 * @return {object}
 */
request.post = function (url) {
  mock.data.url = url;
  return this;
};

/**
 * @param {object} data
 * @return {object}
 */
request.send = function (data) {
  mock.data.payload = data;
  return this;
};

/**
 * @param {string} header
 * @param {string} value
 * @return {object}
 */
request.set = function (header, value) {
  mock.data.headers[header] = value;
  return this;
};

/**
 * @param {function} callback
 * @return {object}
 */
request.end = function (callback) {
  callback(mock.data.errors, mock.data.response);
  return this;
};


module.exports = mock;
