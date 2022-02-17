const express = require('express');
var router = express.Router();

const registerController = require('../controller/register-controller');
const authenticator = require('../authenticator.js');

router.get('/', authenticator.checkNotAuthenticated, registerController.show);

router.post('/submit', registerController.create);

module.exports = router;
