const express = require("express");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/User");
const Reply = require("../model/Reply");

router.get("/", async (req, res) => {
  try {
    const post = await Post.find().sort({ dateCreated: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send(err);
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
  console.log("reached");
  console.log(req.body);
  const postUpdated = await Post.updateOne({ _id: req.params.id }, req.body);
  if (postUpdated) {
    const updatedPost = await Post.findById({ _id: req.params.id });
    console.log(updatedPost);
    res.status(200).send(updatedPost);
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

router.post("/Add_Comment/:id", async (req, res) => {
  try {
    const reply = await Reply.create(req.body);
    const post = await Post.findById({ _id: req.params.id });
    post.comments.push(reply);
    await post.save();
    res.status(200).send(reply);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/Add_Comment_Reply/:id", async (req, res) => {
  try {
    const originalComment = await Reply.findById({ _id: req.params.id });
    const reply = await Reply.create(req.body);
    originalComment.replies.push(reply._id);
    const updatedOriginalComment = await originalComment.save();
    res.status(200).send(reply);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/Edit_Reply/:id", async (req, res) => {
  console.log(req.body);

  try {
    const reply = await Reply.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    const updatedReply = await reply.save();

    console.log(updatedReply);
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

router.get("/num_pages/:page_size", async (req, res) => {
  try {
    const numPages = (await Post.countDocuments()) / req.params.page_size;
    res.status(200).json(numPages);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/page/p?", async (req, res) => {
  try {
    const posts = await Post.find()
      .skip(req.query.page * req.query.limit)
      .limit(req.query.limit);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
