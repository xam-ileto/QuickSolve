const postModel = require('../database/models/post');
const accountModel = require('../database/models/account');
const commentModel = require('../database/models/comment');
const mongoose = import('mongoose');

// for showing post in index page
// also used in editing post
exports.show = async function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    isBigBox: false,
    title: '',
    buttonText: '',
    content: '',
    urlAction: '',
  };

  url = req.originalUrl;
  id = url.substring(url.lastIndexOf('/') + 1);

  if (url.includes('search')) {
    data.title = data.buttonText = 'Search';
    data.urlAction = '/search';
  } else {
    data.buttonText = 'Post';

    if (url.includes('ask')) {
      data.title = 'Ask Question';
      data.urlAction = '/post/question';
    } else if (url.includes('edit-post')) {
      data.title = 'Edit Post';
      post = await postModel.findOneById(id);
      data.content = post.title;
      data.urlAction = '/post/edit-post/' + id;
    } else {
      // if url is edit-comment
      data.title = 'Edit Comment';

      id = id.slice(0, -1);
      comment = await commentModel.findByCommentId(id);
      data.content = comment[0].content;
      data.urlAction = '/post/edit-comment/' + id;
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

  for (element of comments) {
    var data = {
      commentId: element._id,
      commentAuthor: element.accountName,
      commentAuthorId: '',
      commentContent: element.content,
      // checks if logged in user is the author of comment
      // to allow owner to delete/modify
      isCommentAuthor: element.accountName === req.user.accountName,
    };

    commentAuthorId = await accountModel.findOneByAccountName(
      data.commentAuthor
    );

    data.commentAuthorId = commentAuthorId._id.toString();

    finalComments.push(data);
  }
  // TO DO
  var data = {
    layout: 'post-page.hbs',
    postTitle: post.title,
    postAuthor: post.accountName,
    comments: finalComments,
    isAuthor: isAuthor,
    postId: postId,
    isLoggedIn: true,
    accountName: req.user.accountName,
    currentUser: req.user._id.toString(),
    showAccountDetails: true,
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
  res.redirect('/index-logged-in');
};

// for adding a comment
exports.addComment = async (req, res) => {
  var data = {
    content: req.body.content,
    accountName: req.user.accountName,
    postId: req.url.substring(req.url.lastIndexOf('/') + 1),
  };

  // add data to DB
  comment = await commentModel.create(data);

  // send back response with commentId and accountId
  var responseData = {
    commentId: comment._id.toString(),
    accountId: req.user._id.toString(),
    account: req.user.accountName,
  };

  res.status(200).send(responseData);
};

// for modifying post
exports.modifyPost = (req, res) => {
  postId = req.url.substring(req.url.lastIndexOf('/') + 1);
  postModel.modifyPost(postId, req.body.content);
  res.redirect('/index-logged-in');
};

exports.deleteComment = async (req, res) => {
  await commentModel.deleteById(req.body.commentId);
  res.status(200).send(req.body.commentId);
};

exports.modifyComment = (req, res) => {
  commentId = req.url.substring(req.url.lastIndexOf('/') + 1);
  commentModel.modifyComment(commentId, req.body.content);
  res.redirect('/index-logged-in');
};

exports.deletePost = (req, res) => {
  postId = req.url.substring(req.url.lastIndexOf('/') + 1);
  postModel.deleteById(postId);
  commentModel.deleteByPostId(postId);
  res.redirect('/index-logged-in');
};
