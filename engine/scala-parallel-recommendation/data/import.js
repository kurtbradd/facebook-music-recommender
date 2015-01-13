var predictionio = require('predictionio-driver');
var config = require('../../../config/keys.js').predictionio;
var data = require('./test-like-data.js').data.data;

var count = 0;

var eventClient = new predictionio.Events({
	appId: config.appId, 
	accessKey: config.appKey, 
	url: config.eventUrl
});


eventClient.status()
.then(function(status) {
	console.log(status);
	data.forEach(function(person) {
		if (person.hasOwnProperty('likes') && person.likes.hasOwnProperty('data')) {
			var likes = person.likes.data;
			likes.forEach(function(likedPage) {
				userLikeSong(eventClient, parseInt(person.id), parseInt(likedPage.id), function (err, result) {
						if (err) return console.log('ERROR:: ' +err + '\n');
						return console.log(result);
						console.log(++count + 'events imported' + '\n');
				})
			})
		}
	})
});

userLikeSong = function (pioClient, userId, artistId, cb) { 
	pioClient.createEvent({
		event: 'buy',
		entityType:'user',
		entityId: userId,
		targetEntityType: 'item',
		targetEntityId: artistId,
		eventTime: new Date().toISOString()
	})
	.then(function(result) {
		cb(null, result);
	})
	.catch(function(err) {
		cb(err);
	});
}
