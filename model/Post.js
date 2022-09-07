const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 10,
    maxLength: 50,
    required: [true, "Please enter a title for your post"],
  },

  content: {
    type: String,
    minLength: 3,
    maxLength: 1000,
    required: [true, "Please enter some content for your post"],
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },

  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Post must have a user"],
  },

  replies: [
    {
      content: {
        type: String,
        minLength: 3,
        maxLength: 150,
      },
      dateCreated: {
        type: Date,
        default: Date.now(),
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Reply must have a user"],
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
