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
    var push = new Pushover(
      {
        token: 'TOKEN',
        user: 'USER',
        unknown: 'foo'
      }
    );

    push.send(
      {
        title: 'TITLE',
        message: 'MESSAGE',
        timestamp: 123,
        priority: -1,
        url: 'http://url.test',
        urlTitle: 'URL',
        sound: 'SOUND',
        device: 'DEVICE',
        unknown: 'bar'
      }
    ).then(
      function (res) {
        var req = https.mock.getRequest();

        test.equal(req.encoding, 'utf8');
        test.deepEqual(res, { status: 1, success: true });
        test.equal(req.data, 'token=TOKEN&user=USER&message=MESSAGE&' +
            'timestamp=123&title=TITLE&priority=-1&device=DEVICE&' +
            'url=http%3A%2F%2Furl.test&url_title=URL&sound=SOUND\n');

        test.done();
      },
      function (err) {
        console.log(err);
      }
    );
  },

  testMinimal: function (test) {
    (new Pushover()).send(
      {
        message: 'MESSAGE',
        timestamp: null
      }
    ).then(
      function (res) {
        var req = https.mock.getRequest();

        test.deepEqual(res, { status: 1, success: true });
        test.equal(req.data, 'token=ENV_TOKEN&user=ENV_USER&message=MESSAGE\n');

        test.done();
      }
    );
  },

  testEmergencyPriority: function (test) {
    (new Pushover()).send(
      {
        message: 'MESSAGE',
        timestamp: null,
        priority: 2,
        retry: 30,
        expire: 3600
      }
    ).then(
      function (res) {
        var req = https.mock.getRequest();

        test.deepEqual(res, { status: 1, success: true });
        test.equal(req.data, 'token=ENV_TOKEN&user=ENV_USER&message=MESSAGE&' +
            'priority=2&expire=3600&retry=30\n');

        test.done();
      }
    );
  },

  testEmergencyPriorityBadData: function (test) {
    (new Pushover()).send(
      {
        message: 'MESSAGE',
        timestamp: null,
        priority: 2
      }
    ).then(
      function () {
        test.ok(false, 'Call should fail.');
        test.done();
      },
      function (res) {
        var req = https.mock.getRequest();

        test.ok(res.error.length > 0);
        test.equal(res.status, null);
        test.equal(req.data, '');

        test.done();
      }
    );
  },

  testServiceFailure: function (test) {
    https.mock.setResponse('{"status":0,"errors":["FAIL"]}');

    (new Pushover()).send(
      {
        message: 'MESSAGE',
        timestamp: null
      }
    ).then(
      function () {
        test.ok(false, 'Call should fail.');
        test.done();
      },
      function (res) {
        test.deepEqual(res, {
          status: 0,
          errors: ['FAIL'],
          success: false
        });
        test.done();
      }
    );
  },

  testMessageTooLong: function (test) {
    var message = '';
    for (var i = 0; i < 513; i++) {
      message += 'X';
    }

    (new Pushover()).send({ message: message }).then(
      function () {
        test.ok(false, 'Call should fail.');
        test.done();
      },
      function () {
        test.ok(true, 'Message too long');
        test.done();
      }
    );
  },

  testMessageOkaySize: function (test) {
    var message = '';
    for (var i = 0; i < 512; i++) {
      message += 'X';
    }

    (new Pushover()).send({ message: message }).then(
      function () {
        test.ok(true, 'Message length okay.');
        test.done();
      },
      function () {
        test.ok(false, 'Call should succeed.');
        test.done();
      }
    );
  }
};
