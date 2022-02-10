const accountModel = require('../database/models/account');

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
