const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaymentSchema = new Schema({
    transaction_id:{
        type: String,
    },
    amount: {
        type: String,
    },
    email: {
        type: String
    },
    booking_id: {
        type: String
    },
   
},   { strict: false });

module.exports = Payment = mongoose.model('payment', PaymentSchema);