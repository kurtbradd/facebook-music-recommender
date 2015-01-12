var data = require('./test-like-data.js').data.data;

data.forEach(function(person) {
	if (person.hasOwnProperty('likes') && person.likes.hasOwnProperty('data')) {
		var likes = person.likes.data;
		likes.forEach(function(likedPage) {
			console.log(person.name + " likes " + likedPage.name);
		})
	}
})
