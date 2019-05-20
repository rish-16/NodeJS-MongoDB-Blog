const express = require("express");
const router = express.Router();
const Comment = require("../Models/Comment");
const Post = require("../Models/Post");

// 5ce24774aa01a54991f51020

// Get all Comments
router.get("/", async (req, res) => {
  try {
    const posts = await Comment.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get specific comment
router.get("/:commentID", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentID);
    res.json(comment);
  } catch (err) {
    res.json({ message: err });
  }
});

// Adding a new comment to a Post
router.post("/:postID", async (req, res) => {
  const newComment = new Comment({
    commentText: req.body.commentText
  });

  try {
    const savedComment = await newComment.save();
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.postID },
      { $push: { comments: savedComment._id } }
    );
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

// Deleting a Comment
router.delete("/:commentID", async (req, res) => {
  try {
    const deletedComment = await Comment.deleteOne({
      _id: req.params.commentID
    });
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.body.postID },
      { $pop: { comments: req.params.commentID } }
    );
    res.json(deletedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
