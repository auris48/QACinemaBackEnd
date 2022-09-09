const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");
const Reply = require("../model/Reply");

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(er);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", async (req, res) => {
  const post = await Post.updateOne({ _id: req.params.id }, req.body);

  if (post) {
    res.status(200).send(post);
  } else {
    res.status(404).send("Post not found");
  }
});

router.delete("/Delete_Reply/:id", async (req, res) => {
  try {
    const reply = await Reply.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(reply);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post("/Add_Reply/:id", async (req, res) => {
  try {
    const reply = await Reply.create(req.body);
    const post = await Post.findById({ _id: req.params.id });
    post.replies.push(reply);
    await post.save();
    res.status(200).send(reply);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post("/Reply_Reply/:id", async (req, res) => {
  try {
    const originalComment = await Reply.findById({ _id: req.params.id });
    const reply = await Reply.create(req.body);
    originalComment.replies.push(reply._id);
    const updatedOriginalComment = await originalComment.save();
    res.status(200).send(updatedOriginalComment);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/Edit_Reply/:id", async (req, res) => {
  try {
    const reply = await Reply.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    const updatedReply = reply.save();
    res.status(200).send(updatedReply);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  const post = await Post.deleteOne({ _id: req.params.id });
  if (post) {
    res.status(200).send();
  } else {
    res.status(404).send("Post not found");
  }
});

module.exports = router;
