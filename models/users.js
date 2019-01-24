const mongoose = require('mongoose');
const Photo = require('./photos');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    photos: [Photo.schema],
    description: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;