'use strict';

process.argv.push('--config', './test/fixtures/pushoverrc');

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

  testPush: function (test) {
    var push = new Pushover({
      token: 'TOKEN',
      user: 'USER',
      unknown: 'foo'
    });

    push.send({
      title: 'TITLE',
      message: 'MESSAGE',
      timestamp: 123,
      priority: -1,
      unknown: 'bar',

      done: function (res) {
        var req = https.mock.getRequest();

        test.equal(req.encoding, 'utf8');
        test.deepEqual(res, { status: 1 });
        test.equal(req.data, 'token=TOKEN&user=USER&title=TITLE&' +
          'message=MESSAGE&timestamp=123&priority=-1\n');

        test.done();
      }
    });
  },

  testMinimal: function (test) {
    (new Pushover()).send({
      message: 'MESSAGE',
      timestamp: null,

      done: function (res) {
        var req = https.mock.getRequest();

        test.deepEqual(res, { status: 1 });
        test.equal(req.data, 'token=ENV_TOKEN&user=ENV_USER&message=MESSAGE\n');

        test.done();
      }
    });
  },

  testEmergencyPriority: function (test) {
    (new Pushover()).send({
      message: 'MESSAGE',
      timestamp: null,
      priority: 2,
      retry: 30,
      expire: 3600,

      done: function (res) {
        var req = https.mock.getRequest();

        test.deepEqual(res, { status: 1 });
        test.equal(req.data, 'token=ENV_TOKEN&user=ENV_USER&message=MESSAGE&' +
            'priority=2&expire=3600&retry=30\n');

        test.done();
      }
    });
  },

  testEmergencyPriorityBadData: function (test) {
    (new Pushover()).send({
      message: 'MESSAGE',
      timestamp: null,
      priority: 2,

      done: function (res) {
        var req = https.mock.getRequest();

        test.ok(res.error.length > 0);
        test.equal(res.status, null);
        test.equal(req.data, '');

        test.done();
      }
    });
  }
};
