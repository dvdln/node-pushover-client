'use strict';

var https = require('https');

var response = {
  content: ''
};

var request = {
  encoding: '',
  data: '',
  cb: {}
};

https.request = function (options, callback) {
  callback({
    setEncoding: function (enc) {
      request.encoding = enc;
    },
    on: function (event, callback) {
      request.cb[event] = callback;
    }
  });

  return {
    write: function (data) {
      request.data = data;
    },
    end: function () {
      request.cb.data(response.content);
      request.cb.end();
    }
  };
};

https.mock = {
  reset: function () {
    response = {
      content: ''
    };

    request = {
      encoding: '',
      data: '',
      cb: {}
    };
  },

  getRequest: function () {
    return request;
  },

  setResponse: function (content) {
    response.content = content;
  }
};


module.exports = https;
