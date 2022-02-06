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

exports.findOneByAccountName = async function (name, req, res) {
  // name = 'xxx';
  console.log('received name: ' + name);
  result = await accountModel.findOneByAccountName(name);
  return result;
};

exports.findOneById = async function (id, req, res) {
  temp = '61febb7df260fe7d25ecda4b';
  result = await accountModel.findOneById(id);
  return result;
};
