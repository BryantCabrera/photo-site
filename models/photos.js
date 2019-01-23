const mongoose = require('mongoose');

const photoSchema = mongoose.model({
    url: {type: String, required: true},
    title: {type: String, required: true},
    user: String
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;