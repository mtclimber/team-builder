module.exports = function(app) {

    const express = require('express');
    const passport = require('passport');
    const router = express.Router();

    app.use('/api', router);

    const Member = require('./../models/member');

    const registerRoute = router.route('/auth/register');

    registerRoute.post(function(req, res) {

        Member.register(new Member({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                res.send(err);
            }

            passport.authenticate('local')(req, res, function () {
                res.json({ message: 'User registered!' });
            });
        });
    });

    const loginRoute = router.route('/auth/login');

    loginRoute.post(function(req, res) {
        passport.authenticate('local');
        res.json({ message: 'User authenticated!' });
    });

    const logoutRoute = router.route('/auth/logout');

    logoutRoute.post(function(req, res) {
        req.logout();
        res.json({ message: 'Logout successful!' });
    });

};