'use strict';

var request = require('request');


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
        statusCode: 200,
        body: ''
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
request.post = function (data, callback) {
  mock.data.url = data.url;
  mock.data.payload = data.form;

  return callback(mock.data.errors, mock.data.response);
};


module.exports = mock;
