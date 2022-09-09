const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    
    genre: {
        type: String,
        required: true
    },

    imageURL: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    classification: {
        type: String,
        required: true
    },

    releaseDate: {
        type: Date,
        required: true,
        minlength: 4

    },
    runTime: {
        type: String,
        required: true
    },
   
    actors: {
       type: String,
        required: true,
        minlength: 2
      
    },

    director: {
        type: String,
        required: true,
        minlength: 2
    },

    released: { 
        type: Boolean,
        required: false,
    },

    dayShowing: {
        type: Date,
    }    

});

module.exports = mongoose.model("Movies", movieSchema);