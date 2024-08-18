const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
},
{ versionKey: false }
);

const URL = mongoose.model('URL', urlSchema, 'URLs');

module.exports = URL;