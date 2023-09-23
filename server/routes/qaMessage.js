const express = require("express");
const router = express.Router();
const Message = require("../models/qaMessage-model");
const passport = require("passport");
const mongoose = require("mongoose");
//get all QA messages
router.get("/", async (req, res) => {
  try {
    const message = await Message.find();
    return res.json(message);
  } catch (e) {
    return res.status(500).send(e);
  }
});
//get QA message from URL
router.get("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    const message = await Message.find({ _id });
    return res.json(message);
  } catch (e) {
    return res.status(500).send(e);
  }
});
//get QA posted by user
router.get(
  "/userReply/:user_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { user_id } = req.params;
      const message = await Message.find({
        "user._id": new mongoose.Types.ObjectId(user_id),
      });
      return res.json(message);
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
);
//create QA message
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      user: req.user,
    });
    try {
      const newMessage = await message.save();
      return res.status(201).json(newMessage);
    } catch (e) {
      return res.status(400).send(e);
    }
  }
);
//create reply
router.post(
  "/:_id/reply",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const content = req.body.content;
      const user = req.user;
      const message = await Message.findById(_id);
      if (!message) {
        return res.status(404).json({ error: "此留言已被刪除或無此留言" });
      } else {
        const newReply = {
          content: content,
          user: user,
        };
        message.replies.push(newReply);
        await message.save();
        return res.status(201).json(message.replies);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
);
//delete QA
router.delete(
  "/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { _id } = req.params;
      const message = await Message.findOne({ _id });
      if (!message) {
        return res.status(400).json({ error: "此留言已被刪除或無此留言" });
      }
      if (message.user._id.equals(req.user._id)) {
        await Message.deleteOne({ _id }).exec();
        return res.send({ msg: "留言已成功刪除" });
      } else {
        return res.status(403).send("只有留言者，才能刪除留言");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send(e);
    }
  }
);
module.exports = router;
