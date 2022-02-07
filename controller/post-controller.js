const postModel = require('../database/models/post');
const accountModel = require('../database/models/account');

// for showing post in index page
exports.show = function (req, res) {
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

// for showing post in post page
exports.showPostPage = function (req, res) {
  comment1 = {
    commentAuthor: 'Jared',
    commentContent: 'Yay',
  };
  comment2 = {
    commentAuthor: 'Jar',
    commentContent: 'Yay again',
  };
  var data = {
    layout: 'post-page.hbs',
    postTitle: 'What do I do?',
    postAuthor: 'Xam',
    comments: [comment1, comment2],
  };

  res.render('index', data);
};

exports.post = async function (req, res) {
  // console.log(req.user);
  // console.log(req.user.accountName);
  temp = req.user.accountName;

  var data = {
    title: req.body.content,
    accountName: req.user.accountName,
  };

  postModel.create(data);
};
