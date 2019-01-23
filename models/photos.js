const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url: {type: String, required: true},
    title: {type: String, required: true},
    user: {type: String, required: true},
    description: String
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;