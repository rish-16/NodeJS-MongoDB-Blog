const mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
  commentText: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
