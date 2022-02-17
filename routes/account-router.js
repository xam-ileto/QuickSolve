const express = require('express');
var router = express.Router();

const accountController = require('../controller/account-controller');
const authenticator = require('../authenticator.js');

router.get('/create', accountController.create);

router.get(
  '/view-details',
  authenticator.checkAuthenticated,
  accountController.showDetails
);

router.get(
  '/edit-details',
  authenticator.checkAuthenticated,
  accountController.showDetails
);

router.post('/edit-details', accountController.editDetails);

router.get('/view/:id', accountController.showAccountPage);

router.post('/delete', accountController.deleteAccount);

module.exports = router;
