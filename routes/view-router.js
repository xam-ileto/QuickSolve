const express = require('express');
var router = express.Router();

const viewController = require('../controller/view-controller');
const authenticator = require('../authenticator.js');

router.get('/', authenticator.checkAuthenticated, viewController.showAllPosts);

module.exports = router;
