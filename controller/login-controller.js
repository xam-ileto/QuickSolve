exports.show = function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Register',
    isLogin: true,
    isBigBox: true,
  };

  res.render('index', data);
};

exports.authenticate = function (req, res) {};
