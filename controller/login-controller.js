const accountModel = require('../database/models/account');
const bcrypt = require('bcrypt');

exports.show = function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Register',
    isLogin: true,
    isBigBox: true,
  };
  res.render('index', data);
};
