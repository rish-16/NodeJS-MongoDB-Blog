const mongoose = require("mongoose");

var PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Post", PostSchema);
