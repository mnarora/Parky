const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookingSpaceSchema = new Schema({
    address: {
        type: String
    },
    arrival_time : {
        type: String
    },
    departure_time : {
        type: String
    },
    date : {
        type: Date
    },
    price : {
        type : String
    },
    email:{
        type: String
    }
},   { strict: false });

module.exports = BookingSpace = mongoose.model('bookingspace', BookingSpaceSchema);