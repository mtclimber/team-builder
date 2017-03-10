module.exports = function(app) {

    const express = require('express');
    const router = express.Router();

    app.use('/api', router);

    const Member = require('./../models/member');

    const membersRoute = router.route('/members');

    membersRoute.post(function(req, res) {

        const member = new Member();

        member.name = req.body.name;
        member.leader = req.body.leader;
        member.id = req.body.leader;

        // member.save(function(err) {
        //     if (err) { res.send(err); }
        //     res.json({ message: 'Member added!', data: member });
        // });
    });

    membersRoute.get(function(req, res) {

        Member.find(function(err, members) {
            if (err)
                res.send(err);

            res.json(members);
        });
    });

    const memberRoute = router.route('/members/:member_id');

    memberRoute.get(function(req, res) {

        Member.findById(req.params.member_id, function(err, member) {
            if (err)
                res.send(err);

            res.json(member);
        });
    });

    // /api/members/:member_id for PUT
    memberRoute.put(function(req, res) {

        Member.findById(req.params.member_id, function(err, member) {
            if (err)
                res.send(err);

            member.name = req.body.name;
            member.leader = req.body.leader;
            member.id = req.body.leader;

            member.save(function(err) {
                if (err)
                    res.send(err);

                res.json(member);
            });
        });
    });

    memberRoute.delete(function(req, res) {
        Member.findByIdAndRemove(req.params.member_id, function(err) {
            if (err)
                return res.send(err);
            
            res.send('success');
        })
    });

    const usernameRoute = router.route('/members/byusername/:username');
    usernameRoute.get(function(req, res) {
        Member.findByUsername(req.params.username, function(err, response) {
            if (err)
                return res.send(err);
                
            res.json(response);
        })
    });
};