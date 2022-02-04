const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  accountName: String,
  //   comments are represented as an array in Post
  comments: {
    comment: String,
    accountName: String,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
