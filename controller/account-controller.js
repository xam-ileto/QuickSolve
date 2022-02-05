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

exports.findOneByAccountName = async function (req, res) {
  temp = 'x';
  result = await accountModel.findOneByAccountName(temp);
  return result;
};

exports.findOneById = async function (req, res) {
  temp = '61fe5587b0987eed164f3917';
  result = await accountModel.findOneById(temp);
  return result;
};
