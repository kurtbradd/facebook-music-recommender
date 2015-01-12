var predictionio = require('predictionio-driver');
var config = require('../config/keys.js').predictionio;

var engineClient = new predictionio.Engine({ url: config.engineUrl });
var eventClient = new predictionio.Events({
	appId: config.appId, 
	accessKey: config.appKey, 
	url: config.eventUrl
});


eventClient.status()
.then(function(status) {
	console.log(status);
});

engineClient.sendQuery({
	user: 3,
	num: 3
})
.then(function (result) {
	console.log(result);
});
