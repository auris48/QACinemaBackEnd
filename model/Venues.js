const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const venueSchema = new Schema({
    
name: {  
    name: String,
    required: true,
    minlength: 2,
},

}
