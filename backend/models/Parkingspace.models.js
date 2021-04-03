const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ParkingSpaceSchema = new Schema({
    email:{
        type: String,
        unique: false
    },
    password: {
        type: String,
        unique: false
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
    image:{
        
        type: String
    },

},   { strict: false });

module.exports = ParkingSpace = mongoose.model('parkingspace', ParkingSpaceSchema);