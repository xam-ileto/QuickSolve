const express = require('express');
var router = express.Router();

// const Account = require('../database/models/Account');
const accountController = require('../controller/account-controller');

router.get('/create', accountController.create);

router.get('/view-details', accountController.showDetails);

router.get('/edit-details', accountController.showDetails);

router.get('/view/:id', accountController.showAccountPage);

router.post('/delete', accountController.deleteAccount);

module.exports = router;

// router.get('/page', function (req, res) {
//   var data = {
//     isLoggedIn: true,
//     // for search icon
//     isInIndex: true,
//     layout: 'account.hbs',
//     accountName: 'NancyLandgraab',
//   };
//   res.render('index', data);
// });

// router.get('/delete', (req, res) => {
//   name = 'test';
// });

// router.get('/modify-name', (req, res) => {
//   oldName = 'test';
//   newName = 'newtest';

//   Account.findOneAndUpdate(
//     { accountName: oldName },
//     { accountName: newName },
//     (error, post) => {
//       res.redirect('/login');
//     }
//   );
// });

// router.get('/modify-password', (req, res) => {
//   accountName = 'newtest';
//   password = '5678';

//   Account.findOneAndUpdate(
//     { accountName: accountName },
//     { password: password },
//     (error, post) => {
//       res.redirect('/login');
//     }
//   );
// });
