var jsdom = require('jsdom');
var nock = require('nock');
var fs = require('fs');
var tap = require('tap');

function done (errors, window) {
  var AsyncTest = require('./async-test.js');
  var response = { "response":"coolio" };
  var server = 'http://foobar.com';
  var path = '/baz';
  var index = nock(server)
      .get(path)
      .reply(200, response);

  asyncTest = new AsyncTest()
  var document = global.document = window.document;

  tap.test('async add tag ', function (childTest) {
    asyncTest.get(server + path);
    var elem = document.getElementById('status');
    tap.equal(document.getElementById('status').innerHTML,
	      'success',
	      'got a response');
  });
}

var markup = '<html><body><div id="status">pending</div><div id="results"></div></body></html>';
var virtualConsole = jsdom.createVirtualConsole().sendTo(console);

require('jsdom').env({
  html: markup,
  virtualConsole: virtualConsole,
  done: done,
});
