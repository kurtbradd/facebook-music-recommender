var artistController = require('../controllers/artist-controller');
var genreController = require('../controllers/genre-controller');
var authController = require('../controllers/auth-controller');
var queue = require('../workers/queue');

module.exports = function(app, passport) {
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['user_likes', 'user_location'] }));

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect : '/'
  }),
  function(req, res) {
    console.log('made it');
    queue.crawlUser(req.user.values);
    res.redirect('/');
  });

  app.get('/profile', function(req, res) {
    return res.send(200);
  });

  app.get('/api/session', authController.isLoggedIn);

  app.post('/api/artist/:id/like',      artistController.likeArtist);
  app.get('/api/artist/:id',            artistController.getArtist);
  app.get('/api/artist/:id/genre',      artistController.getGenreOfArtist);

  app.get('/api/genre',         genreController.getGenres);
  app.get('/api/genre/artists', genreController.getArtistsByGenre);

  app.get('/api/artist/recommendations', artistController.getArtistRecommendations);

  app.get('*', function(req, res) {
    return res.render('index.html');
  });
};