var moment = require('moment');
var config = require('../../lib/config.js');

createPartnerToReturn = function(partner) {
    return {
         partner: partner,
         lastContacted: getLastDayContacted(partner),
         healthIndex: getHealthIndex(partner)
         //healthIndex: Math.floor(Math.random() * (100 - 1))
     }
}

getLastDayContacted = function(partner) {
    var date = partner.date_created;
    if(partner.history.length > 0)
        date = partner.history[partner.history.length - 1].date;
    var now = moment();
    var md = moment(date);

    return now.diff(md, 'days');
}

calc = function(health, lastDate, currentDate, historyItemValue, multiplier) {
    days = currentDate.diff(lastDate, 'days');
    health -= days * multiplier;
    if(health < 0)
        health = 0;
    
    health += historyItemValue;
    if(health > 100)
        health = 100;
    
    return health;
}

getHealthIndex = function(partner) {
    var now = moment();
    var lastDate = moment(partner.date_created);
    var multiplier = config.damagePerDay[`${partner.commfreq}`];
    var health = 100;

    for(var i = 0; i < partner.history.length; i++) {
        console.log(partner);
        var val = config.contactValue[`${partner.history[i].audience_type}`][`${partner.history[i].interaction_type}`];
        health = calc(health, lastDate, moment(partner.history[i].date), val, multiplier);
        lastDate = moment(partner.history[i].date);
    }

    return calc(health, lastDate, now, 0, multiplier);
}

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
        partner_rating = req.body.partner_rating;
        partner.city = req.body.city;
        partner.state = req.body.state;
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
            // partners = [
            //     {
            //         name: 'Coool Baptist Church',
            //         healthIndex: 63,
            //         lastContacted: 1
            //     },{
            //         name: 'First Baptist Church of Snoreville',
            //         healthIndex: 90,
            //         lastContacted: 17
            //     },{
            //         name: 'Church that we Should Ignore',
            //         healthIndex: 31,
            //         lastContacted: 46
            //     },{
            //         name: 'Best Church Eva',
            //         healthIndex: 3,
            //         lastContacted: 99
            //     }
            // ]

            partners = partners.map((partner) => {
                return createPartnerToReturn(partner);
            })

            res.json(partners);
        });
    });

    const partnerRoute = router.route('/partners/:partner_id');

    partnerRoute.get(function(req, res) {

        Partner.findById(req.params.partner_id, function(err, partner) {
            if (err)
                return res.send(err);

            if(partner === undefined || partner === null)  {
                res.send({'message': 'Partner was not found.'});
                return;
            }

            res.json(createPartnerToReturn(partner));
        });
    });

    // /api/partners/:partner_id for PUT
    partnerRoute.put(function(req, res) {

        Partner.findById(req.params.partner_id, function(err, partner) {
            if (err)
                res.send(err);

            //partner.date_created = moment().subtract(150, 'days').toISOString();
            partner.commfreq = 1;
            partner.save(function(err) {
                if (err)
                    res.send(err);

                res.json(partner);
            });
        });
    });

    partnerRoute.delete(function(req, res) {
        Partner.findByIdAndRemove(req.params.partner_id, function(err) {
            if (err)
                res.send(err);
            
            res.send('success');
        })
    });

    const historyRoute = router.route('/history/:partner_id');

    historyRoute.post(function(req, res) {
        Partner.findById(req.params.partner_id, function(err, partner) {
            if (err)
                res.send(err);

            var note = req.body.note;
            var at = req.body.audience_type;
            var it = req.body.interaction_type;

            partner.history.push({note: note, audience_type: at, interaction_type: it});

            partner.save(function(err) {
                if (err)
                    res.send(err);

                res.json(partner);
            });
        });
    });

};