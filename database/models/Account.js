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
// exports.findOne = function (name, callback) {
//   // console.log(Account.db.name);
//   Account.findOne({ accountName: name }, (error, post) => {
//     console.log(post);

//     if (error) {
//       return callback(err);
//     } else if (post) {
//       return callback(null, post);
//     } else {
//       return callback();
//     }
//   });

// };

exports.findOne = async function (name) {
  try {
    result = await Account.findOne({ accountName: name });
    return result;
  } catch (err) {
    console.log(err);
  }
};
