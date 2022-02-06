const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  accountId: String,
  postId: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
