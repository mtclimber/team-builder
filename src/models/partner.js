'use strict'

/**
 * Partner Schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partnerSchema = new Schema({
    name: { type: String, default: '' },
    commfreq: { type: Number, min: 0, default: 1 },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    primary_name: { type: String, default: '' },
    primary_phone: { type: String, default: '' },
    primary_email: { type: String, default: '' },
    teammember: {type: String, default: '' },
    contact_date: {type: Date, default: Date.now},
    contact_type: {type: String, default: 'Anon'}
});

module.exports = mongoose.model('Partner', partnerSchema);