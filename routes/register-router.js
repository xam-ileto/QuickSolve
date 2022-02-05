const express = require('express');
var router = express.Router();

const registerController = require('../controller/register-controller');

router.get('/', registerController.show);

router.post('/submit', registerController.create);

module.exports = router;
