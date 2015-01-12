var artistController = require('../controllers/artist-controller');
var likeController = require('../controllers/like-controller');
var genreController = require('../controllers/genre-controller');
var authController = require('../controllers/auth-controller');
var queue = require('../workers/queue');

module.exports = function(app, passport) {
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['user_likes', 'user_location'] }));

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect : '/' }), 
    authController.login
  );

  app.get('/api/session',                authController.isLoggedIn);
  app.get('/api/logout',                 authController.logout);

  app.post('/api/like/:id',              likeController.setLike);
  app.get('/api/like',                   likeController.getLikes);

  app.get('/api/artist/:id',             artistController.getArtist);
  app.get('/api/artist/:id/genre',       artistController.getGenreOfArtist);

  app.get('/api/genre',                  genreController.getGenres);
  app.get('/api/genre/artists',          genreController.getArtistsByGenre);

  app.get('/api/artist/recommendations', artistController.getArtistRecommendations);

  app.get('*', function(req, res) { 
    return res.render('index.html'); 
  });
};