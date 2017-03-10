'use strict'

/**
 * Member Schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: { type: String, default: '' },
    leader: {type: String, default: '' },
    id: {type: String, default: '' },
});

module.exports = mongoose.model('Member', memberSchema);