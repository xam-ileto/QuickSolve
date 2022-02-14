const express = require('express');
var router = express.Router();

const postController = require('../controller/post-controller');

router.get('/ask', postController.show);

router.get('/search', postController.show);

router.get('/edit-comment/:commentId', postController.show);

router.post('/edit-comment/:commentId', postController.modifyComment);

router.get('/edit-post/:id', postController.show);

router.post('/edit-post/:id', postController.modifyPost);

router.post('/question', postController.post);

router.get('/view/:id', postController.showPostPage);

router.post('/view/submit/:postId', postController.addComment);

router.post('/comment/delete', postController.deleteComment);

module.exports = router;
