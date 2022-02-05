const express = require('express');
var router = express.Router();

const loginController = require('../controller/login-controller');

router.get('/', loginController.show);

// this function will be changed
// router.post('/submit', loginController.create);

module.exports = router;
