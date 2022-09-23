const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  movieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movies",
    required: false,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  noOfTickets: {
    noOfAdult: {
      type: Number,
      required: true,
      default: 0,

    },
    noOfChild: {
      type: Number,
      required: true,
      default: 0,
    },
    noOfConcession: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  paymentID: {
    type: String, 
  },
});

module.exports = mongoose.model("Bookings", bookingSchema);
