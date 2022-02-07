const express = require('express');
var router = express.Router();

const viewController = require('../controller/view-controller');

router.get('/', viewController.showAllPosts);

module.exports = router;
