const postModel = require('../database/models/post');
const accountModel = require('../database/models/account');
const commentModel = require('../database/models/comment');

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
exports.showPostPage = async function (req, res) {
  postId = req.url.substring(req.url.lastIndexOf('/') + 1);
  post = await postModel.findOneById(postId);

  isAuthor = false;

  // check if current user is author
  console.log('author of post: ' + post.accountName);
  console.log('logged in as: ' + req.user.accountName);

  if (post.accountName === req.user.accountName) {
    isAuthor = true;
  }

  // get comments of post
  finalComments = [];
  comments = await commentModel.findById(postId);

  comments.forEach((element) => {
    finalComments.push({
      commentAuthor: element.accountName,
      commentContent: element.content,
    });
  });

  var data = {
    layout: 'post-page.hbs',
    postTitle: post.title,
    postAuthor: post.accountName,
    comments: finalComments,
    isAuthor: isAuthor,
    postId: postId,
    isLoggedIn: true,
    accountName: req.user.accountName,
  };

  res.render('index', data);
};

// for creating a post
exports.post = async function (req, res) {
  temp = req.user.accountName;

  var data = {
    title: req.body.content,
    accountName: req.user.accountName,
  };

  postModel.create(data);
};

// for adding a comment
exports.addComment = (req, res) => {
  console.log(req.url);

  console.log(req.body.content);
  var data = {
    content: req.body.content,
    accountName: req.user.accountName,
    postId: req.url.substring(req.url.lastIndexOf('/') + 1),
  };

  console.log(data);

  console.log('you submitted the form!');

  // add data to DB
  commentModel.create(data);
};
