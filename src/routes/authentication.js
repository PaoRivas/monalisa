const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup', { layout: 'layout_login' });
})

router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}))

router.get('/signin', (req, res) => {
    res.render('auth/signin', { layout: 'layout_login' })
})

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', (req, res) => {
    res.render('profile');
})

router.get('/logout', (req, res) => {
    //closeConnection();
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;