const accountModel = require('../database/models/account');
const postModel = require('../database/models/post');
const commentModel = require('../database/models/comment');

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
exports.showAccountPage = function (req, res) {
  data = {
    layout: 'account.hbs',
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
