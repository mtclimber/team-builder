module.exports = function(app) {

    const express = require('express');
    const router = express.Router();

    app.use('/api', router);

    const Partner = require('./../models/partner');

    const partnersRoute = router.route('/partners');

    partnersRoute.post(function(req, res) {

        const partner = new Partner();

        partner.name = req.body.name;
        partner.commfreq = req.body.commfreq;
        comm.partner_rating = req.body.partner_rating;
        partner.city = req.body.city;
        partner.state = req.body.state;
        partner.other = req.body.other;
        partner.primary_name = req.body.primary_name;
        partner.primary_phone = req.body.primary_phone;
        partner.primary_email = req.body.primary_email;
        partner.teammember = req.body.teammember;
        partner.history =[];
        partner.save(function(err) {
            if (err) { res.send(err); }
            res.json({ message: 'Partner added!', data: partner });
        });
    });

    partnersRoute.get(function(req, res) {

        Partner.find(function(err, partners) {
            if (err)
                res.send(err);
            //Dummy data
            partners = [
                {
                    name: 'Coool Baptist Church',
                    healthIndex: 63,
                    lastContacted: 1
                },{
                    name: 'First Baptist Church of Snoreville',
                    healthIndex: 90,
                    lastContacted: 17
                },{
                    name: 'Church that we Should Ignore',
                    healthIndex: 31,
                    lastContacted: 46
                },{
                    name: 'Best Church Eva',
                    healthIndex: 3,
                    lastContacted: 99
                }
            ]
            res.json(partners);
        });
    });

    const partnerRoute = router.route('/partners/:partner_id');

    partnerRoute.get(function(req, res) {

        Partner.findById(req.params.partner_id, function(err, partner) {
            if (err)
                res.send(err);

            res.json(partner);
        });
    });

    // /api/partners/:partner_id for PUT
    partnerRoute.put(function(req, res) {

        Partner.findById(req.params.partner_id, function(err, partner) {
            if (err)
                res.send(err);

            partner.name = req.body.name;
            partner.leader = req.body.leader;

            partner.save(function(err) {
                if (err)
                    res.send(err);

                res.json(partner);
            });
        });
    });

};