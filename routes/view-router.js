const express = require('express');
var router = express.Router();

const viewController = require('../controller/view-controller');
const authenticator = require('../authenticator.js');

// for showing index page if not logged in
router.get('/', viewController.showInitialIndex);

router.get(
  '/index-logged-in',
  authenticator.checkAuthenticated,
  viewController.showAllPosts
);

// for showing search results with home page format
router.post(
  '/search',
  authenticator.checkAuthenticated,
  viewController.showSearchPosts
);

module.exports = router;
