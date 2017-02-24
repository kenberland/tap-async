module.exports = AsyncTest;

function AsyncTest() {
  var request = require('superagent');

  this.get = function(url){
    request
      .get(url)
      .then(
	function(data) {
	  var elem = document.getElementById('status');
	  elem.innerHTML = data.body.response;
	},
	function(data) {
	}
      );
  };
}
