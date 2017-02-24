module.exports = AsyncTest;

function AsyncTest() {
  var request = require('superagent');
  var jquery = require('jquery');


  self.get = function(){
    request
      .get()
      .then(
	function(data) {
	  jquery('#status').html('success');
	  jquery('#results').html(data.response.body);
	},
	function(data) {
	  jquery('#status').html('error');
	  jquery('#results').html(data.response.body);
	}
      );
  };
}
