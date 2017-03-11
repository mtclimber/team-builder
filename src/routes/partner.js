var moment = require('moment');
var config = require('../../lib/config.js');
const Partner = require('./../models/partner');
const Team = require('./../models/team');
const Member = require('./../models/member');
var _ = require('lodash');  
getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

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

getChurchData = function(memberId, data, churches, members, recursive) {
    var filtered = [];
    
    for(var i = 0; i < churches.length; i++) {
        if(churches[i].teammember.toString() === memberId.toString())
            filtered.push(churches[i]);
    }

    for(var i = 0; i < filtered.length; i++) {
        rating = getHealthIndex(filtered[i]);
        if(rating >= 90)
            data.great += 1;
        else if(rating >= 50)
            data.good += 1;
        else if(rating >= 25)
            data.sad += 1;
        else if(rating >= 0)
            data.mad += 1;
    }
    
    if(recursive === true) {
        var validMembers = _.filter(members, {'leader': memberId.toString()});
        if(validMembers.length > 0)
            data.hasTeamMembers = true;
            
        for(var i = 0; i < validMembers.length; i++) {
            data = getChurchData(validMembers[i]._id, data, churches, members);
        }
    }

    return data;
}

getLeadingTeamNameFromMemberId = function(memberId, teams) {
    console.log(memberId);
    var val =  _.find(teams, {'leader': memberId.toString()});
    console.log(val);
    return val.name;
}

getChurchDataFromLeader = function(memberId, cb) {
        Member.findById(memberId, (err, member) => {
            Member.find((err, allMembers) => {  
                Partner.find((err, allPartners) => {
                    var dataPoints = [];
                    var tls = _.filter(allMembers, {'leader': memberId.toString()});
                    tls.push(member);
                    console.log(tls);
                    for(var i = 0; i < tls.length; i++) {
                        var uids = getChurchData(tls[i]._id, {
                            name: tls[i].username,
                            id: tls[i]._id,
                            hasTeamMembers: false,
                            teamName: '',
                            great: 0,
                            good: 0,
                            sad: 0,
                            mad: 0
                        }, allPartners, allMembers, i !== tls.length - 1);
                        dataPoints.push(uids);
                    }

                    Team.find((err, allTeams) => {
                        for(var i = 0; i < dataPoints.length; i++) {
                            if(dataPoints[i].hasTeamMembers === true || i === dataPoints.length - 1) {
                                console.log('trying');
                                dataPoints[i].teamName = getLeadingTeamNameFromMemberId(dataPoints[i].id, allTeams);
                            }
                        }
                        console.log(dataPoints);  
                        cb(dataPoints);
                    })
                })
            })
        })
}

module.exports = function(app) {

    const express = require('express');
    const router = express.Router();

    app.use('/api', router);


    const partnersRoute = router.route('/partners');

    partnersRoute.post(function(req, res) {
        const partner = new Partner();

        partner.name = req.body.name;
        // partner.commfreq = req.body.commfreq;
        partner.commfreq = getRandom(2, 0);
        // partner.partner_rating = req.body.partner_rating;
        partner.partner_rating = getRandom(5, 1);
        partner.city = "Bristow";
        partner.state = "Oklahoma";
        partner.primary_name = "Ryan Tankersley";
        partner.primary_phone = "918-555-5555";
        partner.primary_email = "asdf@gmail.com";

        Member.find((err, allMembers) => {
            var ids = allMembers.map((member) => {
                return member._id;
            });

            console.log(ids);

            partner.teammember = ids[getRandom(ids.length - 1, 0)];
            partner.date_created = moment().subtract('days', getRandom(200, 1)).toISOString();

            partner.history =[];
            partner.save(function(err) {
                if (err) { console.log(err); return res.send(err); }
                res.json({ message: 'Partner added!', data: partner });
            });
        })

        
    });

    partnersRoute.get(function(req, res) {

        Partner.find(function(err, partners) {
            if (err)
                res.send(err);

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

    const chartRoute = router.route('/partners/chart/:member_id');

    chartRoute.get(function(req, res) {
        getChurchDataFromLeader(req.params.member_id, (response) => {
            res.json(response);
        })
    });
};
