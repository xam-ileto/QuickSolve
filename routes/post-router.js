const express = require('express');
var router = express.Router();

const postController = require('../controller/post-controller');

router.get('/ask', postController.show);

router.get('/search', postController.show);

router.get('/edit-comment', postController.show);

router.get('/edit-post', postController.show);

router.post('/question', postController.post);

router.get('/view/:id', () => {
  console.log('here');
});

module.exports = router;
