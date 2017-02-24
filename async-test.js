module.exports = AsyncTest;

function AsyncTest() {
  var request = require('superagent');

  this.get = function(url){
    return(request
	   .get(url)
	   .then(
	     function(data) {
	       var elem = document.getElementById('response');
	       elem.innerHTML = data.body.response;
	     }
	   ));
  };
}
