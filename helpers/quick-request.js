var request = require('request');

exports.jsonPostRequest = function (url, body, cb) {
	request.post({
		url:url,
		headers: {'content-type':'application/json'},
		body: JSON.stringify(body),
	}, cb)
}