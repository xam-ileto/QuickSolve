const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  accountName: String,
  postId: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

// for adding a comment to a post
exports.create = async function (data) {
  return await Comment.create(data);
};

// for getting comments
// finds based on POST id, not comment id
exports.findById = async function (id) {
  try {
    result = await Comment.find({ postId: id });
    return result;
  } catch (err) {
    console.log(err);
  }
};

// finds based on COMMENT id
exports.findByCommentId = async function (id) {
  try {
    result = await Comment.find({ _id: id });
    return result;
  } catch (err) {
    console.log(err);
  }
};

exports.getByAccountName = async (passedName) => {
  try {
    return await Comment.find({ accountName: passedName });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteByAccount = (accountName) => {
  Comment.deleteMany({ accountName: accountName }, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.deleteById = (id) => {
  Comment.findOneAndDelete({ _id: id }, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.deleteByPostId = (id) => {
  Comment.findOneAndDelete({ postId: id }, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.modifyComment = async (id, newContent) => {
  try {
    result = await Comment.findOneAndUpdate(
      { _id: id },
      { content: newContent },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.modifyAuthor = async (oldAuthorName, newAuthorName) => {
  try {
    result = await Comment.findOneAndUpdate(
      { accountName: oldAuthorName },
      { accountName: newAuthorName },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};
