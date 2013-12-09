'use strict';

var https = require('./mock/https'),
    Pushover = require('../lib/pushover');

module.exports = {
  setUp: function (callback) {
    https.mock.reset();
    https.mock.setResponse('{"status":1}');

    callback();
  },

  tearDown: function (callback) {
    callback();
  },

  testPushover: function (test) {
    var push = new Pushover({
      token: 'TOKEN',
      user: 'USER',
      unknown: 'foo'
    });

    push.send({
      message: 'MESSAGE',
      timestamp: 123,
      priority: -1,
      unknown: 'bar',

      done: function (res) {
        var req = https.mock.getRequest();

        test.equal(req.encoding, 'utf8');
        test.deepEqual(res, { status: 1 });

        test.equal(
          req.data,
          'token=TOKEN&user=USER&timestamp=123&priority=-1&message=MESSAGE\n'
        );

        test.done();
      }
    });
  }
};
