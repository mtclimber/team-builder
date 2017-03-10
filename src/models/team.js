const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: String,
    leader: String,
});

module.exports = mongoose.model('Team', TeamSchema);