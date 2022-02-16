const mongoose = require('mongoose');

// accounts db name: quicksolve-accounts
mongoose.connect('mongodb+srv://admin:1234@start.fowxh.mongodb.net/quicksolve');

const AccountSchema = new mongoose.Schema({
  accountName: String,
  password: String,
});

const Account = mongoose.model('Account', AccountSchema, 'accounts');

// for creating an account
exports.create = function (sampleData) {
  Account.create(sampleData, (error, post) => {
    if (error) {
      console.log(error);
    }
  });
};

// for getting a user by accountName
exports.findOneByAccountName = async function (name) {
  try {
    result = await Account.findOne({ accountName: name });
    return result;
  } catch (err) {
    console.log(err);
  }
};

exports.findOneById = async function (id) {
  try {
    result = await Account.findOne({ _id: id });
    return result;
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAccount = (id) => {
  Account.findOneAndDelete({ _id: id }, (err, docs) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.editDetailsById = async (passedId, newUsername, newPassword) => {
  try {
    id = passedId.toString();
    await Account.findOneAndUpdate(
      { _id: id },
      { accountName: newUsername, password: newPassword },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }
};
