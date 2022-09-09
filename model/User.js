const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
// import { isEmail } from 'validator';
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [8, "username must be 8 characters or more"],
        maxlength: [20, "username must be 20 characters or less"]
    },
    password: {
        type: String,
        // required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email: {
        type:String,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
    }
}});

// Adds a hash and salt field, and uses these to encrypt the password
// - also adds some helper methods for validating users
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);