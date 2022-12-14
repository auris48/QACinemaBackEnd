const mongoose = require("mongoose");
const { schema } = require("./User");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    maxLength: 50,
    required: [true, "Please enter a title for your post"],
  },

  content: {
    type: String,
    minLength: 5,
    maxLength: 2000,
    required: [true, "Please enter some content for your post"],
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },

  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: [false, "Post must have a movie"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [false, "Post must have a user"],
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [false, "Post must have a movie rating"],
  },

  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Reply",
    autopopulate: true,
  },
});

postSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Post", postSchema);
