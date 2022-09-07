const mongoose = require("mongoose");

const discussionBoardSchema = new mongoose.Schema({
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ]
});

// Adds a hash and salt field, and uses these to encrypt the password
// - also adds some helper methods for validating users

module.exports = mongoose.model("DiscussionBoard", discussionBoardSchema);
