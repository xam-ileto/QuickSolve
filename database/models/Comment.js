const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  accountName: String,
  postId: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

// for adding a comment to a post
exports.create = function (data) {
  Comment.create(data, (err, post) => {
    if (err) {
      console.log(err);
    }
  });
};

// for getting comments
exports.findById = async function (id) {
  try {
    result = await Comment.find({ postId: id });
    return result;
  } catch (err) {
    console.log(err);
  }
};

exports.deleteByAccount = (accountName) => {
  Comment.findOneAndDelete({ accountName: accountName }, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
};
