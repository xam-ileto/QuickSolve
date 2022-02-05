const express = require('express');
const router = express.Router();
const passport = require('passport');
const initializePassport = require('../passport-config.js');

const loginController = require('../controller/login-controller');
const accountController = require('../controller/account-controller');

// initializePassport(passport);

router.get('/', loginController.show);

router.get('/search', async () => {
  result = await accountController.search();
});

module.exports = router;
