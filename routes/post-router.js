const express = require('express');
var router = express.Router();

const postController = require('../controller/post-controller');
const authenticator = require('../authenticator.js');

router.get('/ask', authenticator.checkAuthenticated, postController.show);

router.get('/search', authenticator.checkAuthenticated, postController.show);

router.get(
  '/edit-comment/:commentId',
  authenticator.checkAuthenticated,
  postController.show
);

router.post('/edit-comment/:commentId', postController.modifyComment);

router.get(
  '/edit-post/:id',
  authenticator.checkAuthenticated,
  postController.show
);

router.post('/edit-post/:id', postController.modifyPost);

router.post('/question', postController.post);

router.get(
  '/view/:id',
  authenticator.checkAuthenticated,
  postController.showPostPage
);

router.post('/view/submit/:postId', postController.addComment);

router.post('/comment/delete', postController.deleteComment);

router.post('/delete-post/:postId', postController.deletePost);

module.exports = router;
