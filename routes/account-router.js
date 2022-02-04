const express = require('express');
var router = express.Router();

const Account = require('../database/models/Account');

router.get('/page', function (req, res) {
  var data = {
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    layout: 'account.hbs',
    accountName: 'NancyLandgraab',
  };
  res.render('index', data);
});

router.get('/create', (req, res) => {
  sampleAccount = {
    accountName: 'test',
    password: '1234',
  };

  Account.create(sampleAccount, (error, post) => {
    // send user to login once account created
    res.redirect('/login');
  });
});

router.get('/delete', (req, res) => {
  name = 'test';

  Account.findOneAndDelete({ accountName: name }, (error, post) => {
    res.redirect('/login');
  });
});

router.get('/modify-name', (req, res) => {
  oldName = 'test';
  newName = 'newtest';

  Account.findOneAndUpdate(
    { accountName: oldName },
    { accountName: newName },
    (error, post) => {
      res.redirect('/login');
    }
  );
});

router.get('/modify-password', (req, res) => {
  accountName = 'newtest';
  password = '5678';

  Account.findOneAndUpdate(
    { accountName: accountName },
    { password: password },
    (error, post) => {
      res.redirect('/login');
    }
  );
});

module.exports = router;
