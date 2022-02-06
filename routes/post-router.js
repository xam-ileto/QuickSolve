const express = require('express');
var router = express.Router();

const postController = require('../controller/post-controller');

router.get('/ask', postController.show);

router.get('/search', postController.show);

module.exports = router;
