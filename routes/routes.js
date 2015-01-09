var artistController = require('../controllers/artist-controller');
var genreController = require('../controllers/genre-controller');
var queue = require('../workers/queue');

module.exports = function(app, passport) {
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email', 'user_likes'] }));

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect : '/'
  }),
  function(req, res) {
    queue.crawlUser(req.user.values);
    queue.crawlGenres();
    res.redirect('/');
  });

  app.get('/profile', function(req, res) {
    return res.send(200);
  });

  app.post('/api/artist/:id/like', artistController.likeArtist);
  app.get('/api/artist/recommendation', artistController.getArtistRecommendations);

  app.get('/api/genre', genreController.getGenres);
  app.get('/api/genre/artists', genreController.getArtistsByGenre);

  app.get('*', function(req, res) {
    return res.render('index.html');
  });
};