const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  accountName: String,
  password: String,
  //   comments are represented as an array in Post
  comments: {
    type: String,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
