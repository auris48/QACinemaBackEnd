const mongoose = require("mongoose");
const { schema } = require("./User");

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
    maxLength: 50,
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
    required: [false, "Post must have a user"],
  },

  replies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Reply",
    autopopulate: true,
  },
});
postSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Post", postSchema);