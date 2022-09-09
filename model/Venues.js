const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const venueSchema = new Schema({

    name: {  
        type: String,
        required: true,
        minlength: 2,
    },

    address: {
        type: String,
        required: true,
        minlength: 2,
    },

    imageURL: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    openingTimes: {
        type: String,
        required: true,
    },

    numberOfScreens: {
        type: Integer,
        required: true,
    },











});

module.exports = mongoose.model("Venues", venueSchema);
