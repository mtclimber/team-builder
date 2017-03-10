'use strict'

/**
 * Partner Schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    date: {type: Date, default: Date.now},
    audience_type: {type: Number, min: 0},
    interaction_type: {type: Number, min: 0},
});

const partnerSchema = new Schema({
    name: { type: String, default: '' },
    commfreq: { type: Number, min: 0, default: 1 },
    date_created: {type: Date, default: Date.now},
    partner_rating: { type: Number, min: 0, default: 1 },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    other: { type: Boolean},
    primary_name: { type: String, default: '' },
    primary_phone: { type: String, default: '' },
    primary_email: { type: String, default: '' },
    teammember: {type: String, default: '' },
    history: [historySchema]
});

module.exports = mongoose.model('Partner', partnerSchema);