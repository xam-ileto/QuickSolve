const accountModel = require('../database/models/account');

exports.show = function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Register',
    isLogin: false,
    isBigBox: true,
  };
  res.render('index', data);
};

exports.create = function (req, res) {
  accountModel.create(req.body);
  res.redirect('/login');
};
