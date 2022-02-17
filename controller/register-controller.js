const accountModel = require('../database/models/Account');
const bcrypt = require('bcrypt');

exports.show = function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Register',
    isLogin: false,
    isBigBox: true,
    isLoginOrRegister: true,
  };
  res.render('index', data);
};

exports.create = function (req, res) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      console.log(hash);

      data = {
        accountName: req.body.accountName,
        password: hash,
      };

      accountModel.create(data);
    });
  });

  res.redirect('/login');
};
