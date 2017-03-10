module.exports = function(app) {

    const express = require('express');
    const router = express.Router();

    app.use('/api', router);

    const Team = require('./../models/team');

    const teamsRoute = router.route('/teams');

    teamsRoute.post(function(req, res) {

        const team = new Team();

        team.name = req.body.name;
        team.leader = req.body.leader;

        team.save(function(err) {
            if (err) { res.send(err); }
            res.json({ message: 'Team added!', data: team });
        });
    });

    teamsRoute.get(function(req, res) {

        Team.find(function(err, teams) {
            if (err)
                res.send(err);

            res.json(teams);
        });
    });

    const teamRoute = router.route('/teams/:team_id');

    teamRoute.get(function(req, res) {

        Team.findById(req.params.team_id, function(err, team) {
            if (err)
                res.send(err);

            res.json(team);
        });
    });

    // /api/teams/:team_id for PUT
    teamRoute.put(function(req, res) {

        Team.findById(req.params.team_id, function(err, team) {
            if (err)
                res.send(err);

            team.name = req.body.name;
            team.leader = req.body.leader;

            team.save(function(err) {
                if (err)
                    res.send(err);

                res.json(team);
            });
        });
    });

};