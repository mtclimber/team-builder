var mongoose = require('mongoose'),
    Team = mongoose.model('Team');

exports.findAll = function(req, res){
    Team.find({},function(err, results) {
        return res.send(results);
    });
};

exports.findById = function(req, res){
    var name = req.params.name;
    Team.findOne({'name':name},function(err, result) {
        return res.send(result);
    });
};

exports.update = function(req, res) {
    var name = req.params.name;
    var leader = req.params.leader;

    Team.update({'name':name}, updates, function (err, numberAffected, raw) {
        if (err) return console.log(err);
        console.log('Updated %d teams', numberAffected);
        return res.send(raw);
    });
}

exports.add = function(req, res) {
    const team = new Team(req.body);

    team.save(function(err) {
        if (err) {
            return res.send(err);
        }
    });
}

exports.delete = function(req, res){
    var name = req.params.name;
    Team.remove({'name':name},function(result) {
        return res.send(result);
    });
};

exports.import = function(req, res){
    Team.create(
        { "name": "Someplace", "leader": "Test" },
        { "name": "Otherplace","leader": "Test" },
        function (err) {
            if (err) return console.log(err);
            return res.send(202);
        });
};