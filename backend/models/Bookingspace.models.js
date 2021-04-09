const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookingSpaceSchema = new Schema({
    address: {
        type: String
    },
    arrivaltime : {
        type: String
    },
    departuretime : {
        type: String
    },
    date : {
        type: Date
    }
},   { strict: false });

module.exports = BookingSpace = mongoose.model('bookingspace', BookingSpaceSchema);