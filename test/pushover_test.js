'use strict';

process.argv.push('--config', './test/fixtures/pushoverrc');

var mockRequest = require('./mock/request'),
    Pushover = require('../lib/pushover');

module.exports = {
  setUp: function (callback) {
    mockRequest.reset();
    mockRequest.setResponseBody('{"status":1}');

    callback();
  },

  tearDown: function (callback) {
    callback();
  },

  testPush: function (test) {
    var baseData = {
      token: 'TOKEN',
      user: 'USER',
      unknown: 'foo'
    };

    var userData = {
      title: 'TITLE',
      message: 'MESSAGE',
      timestamp: 123,
      priority: -1,
      url: 'http://url.test',
      urlTitle: 'URL',
      sound: 'SOUND',
      device: 'DEVICE',
      unknown: 'bar'
    };

    var expected = {
      token: 'TOKEN',
      user: 'USER',
      message: 'MESSAGE',
      timestamp: 123,
      title: 'TITLE',
      priority: -1,
      device: 'DEVICE',
      url: 'http://url.test',
      url_title: 'URL',
      sound: 'SOUND'
    };

    (new Pushover(baseData)).send(userData).then(
      function (res) {
        var req = mockRequest.data;

        test.deepEqual(res, { status: 1, success: true });
        test.deepEqual(req.payload, expected);

        test.done();
      }
    );
  },

  testMinimal: function (test) {
    var baseData = null;

    var userData = {
      message: 'MESSAGE',
      timestamp: null
    };

    var expected = {
      token: 'ENV_TOKEN',
      user: 'ENV_USER',
      message: 'MESSAGE'
    };

    (new Pushover(baseData)).send(userData).then(
      function (res) {
        var req = mockRequest.data;

        test.ok(res.success, 'Success.');
        test.deepEqual(req.payload, expected);

        test.done();
      }
    );
  },

  testEmergencyPriority: function (test) {
    var baseData = null;

    var userData = {
      message: 'MESSAGE',
      timestamp: null,
      priority: 2,
      retry: 30,
      expire: 3600
    };

    var expected = {
      token: 'ENV_TOKEN',
      user: 'ENV_USER',
      message: 'MESSAGE',
      priority: 2,
      expire: 3600,
      retry: 30
    };

    (new Pushover(baseData)).send(userData).then(
      function (res) {
        var req = mockRequest.data;

        test.ok(res.success, 'Success.');
        test.deepEqual(req.payload, expected);

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
      function (res) {
        var req = mockRequest.data;

        test.ok(res.errors.length > 0);
        test.equal(res.status, null);
        test.equal(req.payload, null);

        test.done();
      }
    );
  },

  testServiceFailure: function (test) {
    mockRequest.setResponseBody('{"status":0,"errors":["FAIL"]}');

    (new Pushover()).send(
      {
        message: 'MESSAGE',
        timestamp: null
      }
    ).then(
      function (res) {
        test.equal(res.success, false);
        test.equal(res.status, 0);
        test.deepEqual(res.errors, ['FAIL']);

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
      }
    );
  }
};
