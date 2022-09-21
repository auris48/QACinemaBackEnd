const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: false,
        minlength: 2
    },
    
    genre: {
        type: String,
        required:false 
    },

    imageURL: {
        type: String,
        required: false
    },

    trailerURL: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    },

    classification: {
        type: String,
        required: false
    },

    releaseDate: {
        type: Date,
        required: false,
        minLength: 4

    },
    runTime: {
        type: String,
        required: false
    },
   
    actors: {
       type: String,
        required: false,
        minLength: 2
      
    },

    director: {
        type: String,
        required: false,
        minLength: 2
    },

    released: { 
        type: Boolean,
        required: false,
    },

    dayShowing: {
        type: [Date],
    },

    featured: {
        type: Boolean,
        required: false,
    },

    sliderImageURL: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model("Movies", movieSchema);