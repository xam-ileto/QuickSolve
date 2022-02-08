const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  accountName: String,
  postId: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

// module.exports = Comment;

// for adding a comment to a post
exports.create = function (data) {
  Comment.create(data, (error, post) => {
    if (err) {
      console.log(err);
    }
  });
};
