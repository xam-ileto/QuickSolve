const accountModel = require('../database/models/account');
const postModel = require('../database/models/post');
const commentModel = require('../database/models/comment');
const bcrypt = require('bcrypt');

// double check if this function is needed
exports.create = function (req, res) {
  sampleData = {
    accountName: 'test',
    password: '1234',
  };
  accountModel.create(sampleData);
  res.redirect('/login');
};

exports.showDetails = function (req, res) {
  var data = {
    layout: 'account-details.hbs',
    title: '',
    isEdit: false,
    isLoggedIn: true,
    accountName: req.user.accountName,
    currentUser: req.user._id.toString(),
  };

  url = req.originalUrl;

  if (url.includes('view')) {
    data.title = 'View Account';
  } else {
    // if url is edit details
    data.title = 'Edit Account';
    data.isEdit = true;
  }

  res.render('index', data);
};

exports.findOneByAccountName = async function (name, req, res) {
  result = await accountModel.findOneByAccountName(name);
  return result;
};

exports.findOneById = async function (id, req, res) {
  result = await accountModel.findOneById(id);
  return result;
};

// for showing account page

exports.showAccountPage = async (req, res) => {
  accountId = req.url.substring(req.url.lastIndexOf('/') + 1);
  accountName = await accountModel.findOneById(accountId);
  accountName = accountName.accountName;
  // get each post
  originalPosts = await postModel.getByAccountName(accountName);
  posts = [];
  originalPosts.forEach((element) => {
    newPost = {
      postTitle: element.title,
      postId: element._id.toString(),
    };
    posts.push(newPost);
  });
  // get each comment
  originalComments = await commentModel.getByAccountName(accountName);
  comments = [];
  originalComments.forEach((element) => {
    newComment = {
      commentContent: element.content,
      commentId: element._id.toString(),
    };
    comments.push(newComment);
  });
  data = {
    layout: 'account.hbs',
    accountPageName: accountName,
    accountName: req.user.accountName,
    numOfPosts: posts.length,
    numOfComments: comments.length,
    posts: posts,
    comments: comments,
    isOwnPage: req.isAuthenticated()
      ? accountName === req.user.accountName
      : false,
    showAccountDetails: true,
    isLoggedIn: req.isAuthenticated(),
  };

  res.render('index', data);
};

// for deleting account (also deletes account's posts and comments)
exports.deleteAccount = (req, res) => {
  accountName = req.user.accountName;
  accountModel.deleteAccount(req.user._id);
  postModel.deleteByAccount(accountName);
  commentModel.deleteByAccount(accountName);
  res.redirect('/login');
};

// for modifying acct name and password
exports.editDetails = (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.newPassword, salt, async (err, hash) => {
      id = req.user._id;
      console.log('id in controller: ' + id);
      await accountModel.editDetailsById(id, req.body.newUsername, hash);
      res.redirect('/index-logged-in');
    });
  });
};
