const postModel = require('../database/models/post');
const accountModel = require('../database/models/account');
const accountController = require('./account-controller.js');

// for showing all posts in index-logged-in
exports.showAllPosts = async function (req, res) {
  posts = await postModel.getAllPosts();
  newPosts = [];

  for (element of posts) {
    var accountNameId = await accountModel.findOneByAccountName(
      element.accountName
    );
    accountNameId = accountNameId._id.toString();

    post = {
      postId: element._id.toString(),
      postTitle: element.title,
      accountName: element.accountName,
      accountNameId: accountNameId,
    };
    newPosts.push(post);
  }

  accountName = req.user.accountName;
  var data = {
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    accountName: accountName,
    posts: newPosts,
    currentUser: req.user._id.toString(),
    showAccountDetails: true,
  };

  res.render('index', data);
};

// for showing search results
exports.showSearchPosts = async (req, res) => {
  console.log(req.body.content);

  postsWithQuery = await postModel.getByQuery(req.body.content);

  console.log(postsWithQuery);

  var data = {
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    accountName: req.user.accountName,
    posts: postsWithQuery,
    currentUser: req.user._id.toString(),
    showAccountDetails: true,
  };

  res.render('index', data);
};
