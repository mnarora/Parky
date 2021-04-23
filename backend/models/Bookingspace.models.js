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
    arrival_date : {
        type: Date
    },
    departure_date: {
        type: Date
    },
    price : {
        type : String
    },
    email:{
        type: String
    },
    no_of_booked_spaces: {
        type : String
    },
    booked_space_id:{
        type: String
    },
    order_status: {
        type: String,
        default: 'Completed'
    },
},   { strict: false });

module.exports = BookingSpace = mongoose.model('bookingspace', BookingSpaceSchema);