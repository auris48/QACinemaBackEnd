const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
        required: false
    },
    day: {
        type: String,
        minlenght: "5",
        required: true
    },
    time: {
        type: String,
        required: true
    },
    noOfTickets: {
        noOfAdult: {
            type: Number,
            required: true,
            default: 0
        },
        noOfChild: {
            type: Number,
            required: true,
            default: 0
        },
        noOfConcession: {
            type: Number,
            required: true,
            default: 0
        }   

    },
    paymentID: {
        type: String
    }
});

module.exports = mongoose.model("Bookings", bookingSchema);