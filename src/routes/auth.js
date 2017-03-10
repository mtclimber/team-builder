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
    const router = express.Router();

    app.use('/api', router);

    const Member = require('./../models/member');

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