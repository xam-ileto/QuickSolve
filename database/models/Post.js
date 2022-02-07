const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:1234@start.fowxh.mongodb.net/quicksolve');

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

// module.exports = Post;
