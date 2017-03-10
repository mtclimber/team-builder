const Team = require('./../models/team');
getLeader = function(teamName, cb) {
    if(teamName === 'None') {
        return cb({err: false, val: ''});
    }

    Team.find({'name': teamName}, (err, response) => {
        if(err) {
            return cb({err: true});
        }

        console.log(response);
        return cb({err: false, val: response[0].leader});
    });
}

module.exports = function(app) {
    const express = require('express');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const router = express.Router();

    app.use('/api', router);

    const Member = require('./../models/member');
    passport.use(new LocalStrategy(Member.authenticate()));
    passport.serializeUser(Member.serializeUser());
    passport.deserializeUser(Member.deserializeUser());

    const registerRoute = router.route('/auth/register');

    registerRoute.post(function(req, res) {
        getLeader(req.body.teamName, (response) => {
            if(response.err)
                res.send(response);
            
            var mem = new Member({name: req.body.name, username : req.body.username, leader: response.val });
            console.log(mem);
             Member.register(mem, 'thisisatestpassword', function(err, account) {
                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                var lt = req.body.leadingTeamName;
                if(lt !== null && lt !== undefined && lt !== '') {
                    console.log(account);
                    const team = new Team();
                    team.name = lt;
                    team.leader = account._id;
                    team.save(function(err) {
                        if(err) {
                            console.log('Oh crap! We didn\'t handle this...');
                            console.log(err);
                        }
                    });
                }

                passport.authenticate('local')(req, res, function () {
                    res.json({ message: 'User registered!' });
                });
            });
        });
    });

    const loginRoute = router.route('/auth/login');

    loginRoute.post(passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

    const logoutRoute = router.route('/auth/logout');

    logoutRoute.get(function(req, res) {
      req.logout();
      res.redirect('/login');
    });

    const getUserRoute = router.route('/auth/loggedInUser');
    getUserRoute.get(function(req, res) {
        console.log(req.session);
        if(req.session.passport === undefined)
            return res.json(null);

        const user = req.session.passport.user;
        console.log(user);
        Member.findByUsername(user, (err, response) => {
            res.json(response);
        });
    });

};