// require post model

exports.show = function (req, res) {
  var data = {
    title: 'Post Question',
    layout: 'boxpage.hbs',
    isBigBox: false,
  };
  res.render('index', data);
};
