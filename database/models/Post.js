const mongoose = require('mongoose');
const { dbURL } = require('../../config');

mongoose.connect(dbURL);

const PostSchema = new mongoose.Schema({
  title: String,
  accountName: String,
});

const Post = mongoose.model('Post', PostSchema, 'posts');

// for creating a post
exports.create = function (data) {
  Post.create(data, (error, post) => {
    if (error) {
      console.log(error);
    }
  });
};

// for getting all posts
exports.getAllPosts = async function () {
  try {
    return await Post.find({});
  } catch (err) {
    console.log(err);
  }
};

// for getting single post
exports.findOneById = async function (id) {
  try {
    return await Post.findOne({ _id: id });
  } catch (err) {
    console.log(err);
  }
};

// for modifying post
exports.modifyPost = async (id, newContent) => {
  try {
    result = await Post.findOneAndUpdate(
      { _id: id },
      { title: newContent },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.deleteByAccount = (accountName) => {
  Post.deleteMany({ accountName: accountName }, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.deleteById = (id) => {
  Post.findOneAndDelete({ _id: id }, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.getByAccountName = async (passedName) => {
  try {
    return await Post.find({ accountName: passedName });
  } catch (err) {
    console.log(err);
  }
};

// for searching for posts with the query in its title
exports.getByQuery = async (query) => {
  try {
    return await Post.find({ title: { $regex: query, $options: 'i' } });
  } catch (err) {
    console.log(err);
  }
};

exports.modifyAuthor = async (oldAuthorName, newAuthorName) => {
  try {
    result = await Post.findOneAndUpdate(
      { accountName: oldAuthorName },
      { accountName: newAuthorName },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};
