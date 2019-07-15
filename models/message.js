let mongoose = require('mongoose');



let ecrit = new mongoose.Schema({
    date: String,
    message: String,
    username: String
});

module.exports = mongoose.model('chatDB', ecrit)