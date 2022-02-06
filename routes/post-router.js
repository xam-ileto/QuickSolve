const express = require('express');
var router = express.Router();

const postController = require('../controller/post-controller');

router.get('/ask', postController.show);

module.exports = router;
