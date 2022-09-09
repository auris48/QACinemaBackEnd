const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
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
    required: [false, "Reply must have a user"],
  },

  replies: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Reply",
    autopopulate: true,
  },
});
replySchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("Reply", replySchema);
