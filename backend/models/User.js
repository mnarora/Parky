const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    uname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    } 
});

module.exports = User = mongoose.model('user', UserSchema);