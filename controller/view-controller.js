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

// index page shown if not logged in
exports.showInitialIndex = async (req, res) => {
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

  var data = {
    isLoggedIn: false,
    // for search icon
    isInIndex: false,
    // get first 20 posts only if not logged in
    posts: newPosts.slice(0, 20),
  };

  // var data = {
  //   isLoggedIn: false,
  // };
  // console.log('index');
  res.render('index', data);
};

// for showing search results
exports.showSearchPosts = async (req, res) => {
  console.log(req.body.content);

  postsWithQuery = await postModel.getByQuery(req.body.content);
  newPosts = [];

  for (element of postsWithQuery) {
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

  var data = {
    isLoggedIn: true,
    // for search icon
    isInIndex: false,
    accountName: req.user.accountName,
    posts: newPosts,
    currentUser: req.user._id.toString(),
    showAccountDetails: true,
  };

  res.render('index', data);
};
