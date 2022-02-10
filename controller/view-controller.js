const postModel = require('../database/models/post');
const accountController = require('./account-controller.js');

// for showing all posts in index-logged-in
exports.showAllPosts = async function (req, res) {
  posts = await postModel.getAllPosts();
  newPosts = [];

  posts.forEach((element) => {
    console.log;
    post = {
      postId: element._id.toString(),
      postTitle: element.title,
      accountName: element.accountName,
    };
    newPosts.push(post);
  });

  accountName = req.user.accountName;

  var data = {
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    accountName: accountName,
    posts: newPosts,
    currentUser: req.user._id.toString(),
  };

  res.render('index', data);
};
