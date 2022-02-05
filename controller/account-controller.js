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

exports.search = async function (req, res) {
  temp = 'x';
  result = await accountModel.findOne(temp);
  return result;
};
