const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    uname:{
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    contact: {
        type: Number
    },
    password: {
        type: String
    },
    isuser: {
        type: Boolean
    }
});

module.exports = User = mongoose.model('user', UserSchema);