const mongoose = require('mongoose');

// accounts db name: quicksolve-accounts
mongoose.connect('mongodb+srv://admin:1234@start.fowxh.mongodb.net/quicksolve');

const AccountSchema = new mongoose.Schema({
  accountName: String,
  password: String,
});

const Account = mongoose.model('Account', AccountSchema);

// for creating an account
exports.create = function (sampleData) {
  Account.create(sampleData, (error, post) => {
    if (error) {
      console.log(error);
    }
  });
};
