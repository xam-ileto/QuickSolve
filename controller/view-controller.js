const postModel = require('../database/models/post');
const accountController = require('./account-controller.js');

exports.showAllPosts = function (req, res) {
  console.log('showing all posts');

  accountName = req.user.accountName;

  //   accountName = await accountController.findOneById(req.session.passport.user);
  //   accountName = accountName.accountName;

  post1 = {
    postTitle: 'Why?',
    author: 'Me',
  };
  post2 = {
    postTitle: 'Why again?',
    author: 'Me again',
  };
  var data = {
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    accountName: accountName,
    posts: [post1, post2],
  };
  res.render('index', data);
};
