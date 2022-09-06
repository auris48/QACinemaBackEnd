const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Adds a hash and salt field, and uses these to encrypt the password
// - also adds some helper methods for validating users
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);