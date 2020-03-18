var router = require('express').Router();
var passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res) {
    res.redirect('/spirits');
});

router.get('/auth/google', passport.authenticate(
    'google', { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google', {
        successRedirect: '/spirits',
        failureRedirect: '/spirits'
    }
));
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;