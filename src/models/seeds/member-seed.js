const config = require('../../../lib/config');
const mongoose = require('mongoose');
const member = require('../member');

mongoose.connect(config.database);

const johndoe = new member ({
    name: "John Doe",
    leader: "Leader",
    id: "ID"
});

johndoe.save(function (err) {if (err) console.log ('Error on save!')});






