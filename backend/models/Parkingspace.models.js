const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParkingSpaceSchema = new Schema({
    email:{
        type: String,
    },
    price: {
        type: String,
    },
    address: {
        type: String
    },
    info: {
        type: String
    },
    surfacetype: {
        type: String
    },
    spacenumber: {
        type: Number
    },
    accepted_vehicles: {
        type: Array
    },
    isVerified: {
        type: Boolean
    } 
},   { strict: false });

module.exports = ParkingSpace = mongoose.model('parkingspace', ParkingSpaceSchema);