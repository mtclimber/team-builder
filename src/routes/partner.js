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
        partner.city = req.body.city;
        partner.state = req.body.state;
        partner.primary_name = req.body.primary_name;
        partner.primary_phone = req.body.primary_phone;
        partner.primary_email = req.body.primary_email;
        partner.teammember = req.body.teammember;
        partner.contact_date = req.body.contact_date;
        partner.contact_type = req.body.contact_type;

        partner.save(function(err) {
            if (err) { res.send(err); }
            res.json({ message: 'Partner added!', data: partner });
        });
    });

    partnersRoute.get(function(req, res) {

        Partner.find(function(err, partners) {
            if (err)
                res.send(err);

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