var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

const memberSchema = new Schema({
    name: { type: String, default: '' },
    leader: { type: String, default: '' },
    id: { type: String, default: '' },
    username: String,
    password: String
});

memberSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Member', memberSchema);