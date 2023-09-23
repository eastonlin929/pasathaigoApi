const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: Object },
  time: {
    type: Date,
    default: Date.now,
  },
});

const messageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  user: { type: Object },
  replies: [replySchema],
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
