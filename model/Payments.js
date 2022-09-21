
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
        required: false
    },
    
    paymentDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    
});

module.exports = mongoose.model("Bookings", bookingSchema);