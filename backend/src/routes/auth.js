const config = require('../../config/index');
const passport = require('passport');
const router = require('express').Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/callback',
      '/login',
      '/logout'
    ]
  });
});

router.use('/callback',
  passport.authenticate('oauth2', {
    failureRedirect: 'error'
  }),
  (_req, res) => {
    res.redirect(config.get('server:frontend'));
  }
);

router.use('/error', (_req, res) => {
  res.status(401).json({
    message: 'Error: Unable to authenticate'
  });
});

router.get('/login', passport.authenticate('oauth2'));


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(config.get('server:frontend'));
});


module.exports = router;