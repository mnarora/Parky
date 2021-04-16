const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
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
},   { strict: false });

module.exports = User = mongoose.model('user', UserSchema);