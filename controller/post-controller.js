// require post model

exports.show = function (req, res) {
  // TO DO
  console.log(req.originalUrl);
  // console.log(req);

  var data = {
    layout: 'boxpage.hbs',
    isBigBox: false,
    title: '',
    buttonText: '',
  };

  url = req.originalUrl;

  if (url.includes('search')) {
    data.title = data.buttonText = 'Search';
  } else {
    data.buttonText = 'Post';

    if (url.includes('ask')) {
      data.title = 'Ask Question';
    } else if (url.includes('edit-post')) {
      data.title = 'Edit Post';
    } else {
      // if url is edit-comment
      data.title = 'Edit Comment';
    }
  }

  res.render('index', data);
};
