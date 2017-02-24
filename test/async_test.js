var jsdom = require('jsdom');
var nock = require('nock');
var fs = require('fs');
var tap = require('tap');

function done (errors, window) {
  var AsyncTest = require('../async-test.js');
  var response = { "response":"coolio" };
  var server = 'http://foobar.com';
  var path = '/baz';
  var index = nock(server)
      .get(path)
      .reply(200, response);

  asyncTest = new AsyncTest()
  var document = global.document = window.document;

  tap.test('get', function() {
    return asyncTest.get(server + path).then(function(result) {
      tap.equal(document.getElementById('response').innerHTML,
		response.response,
		'got a response');
      tap.end();
    });
  }).catch(tap.threw);
}

var markup = '<html><body><div id="response">pending</div></body></html>';
var virtualConsole = jsdom.createVirtualConsole().sendTo(console);

require('jsdom').env({
  html: markup,
  virtualConsole: virtualConsole,
  done: done,
});
