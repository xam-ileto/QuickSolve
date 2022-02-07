const postModel = require('../database/models/post');
// const { post } = require('../routes/view-router');
const accountController = require('./account-controller.js');

exports.showAllPosts = async function (req, res) {
  posts = await postModel.getAllPosts();
  newPosts = [];

  posts.forEach((element) => {
    post = {
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
  };

  res.render('index', data);
};
