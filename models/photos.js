const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const photoSchema = new mongoose.Schema({
    url: {type: String, required: true},
    // user: {type: mongoose.Schema.types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    description: String
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;