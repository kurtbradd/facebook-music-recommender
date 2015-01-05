module.exports = function(app, passport) {
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect : '/'
  }), function(req, res) {
    return res.status(200).send(req.user);
  });

  app.get('/profile', function(req, res) {
    return res.send(200);
  });
};