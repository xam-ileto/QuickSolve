if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = express.Router();

const loginController = require('../controller/login-controller');
const accountController = require('../controller/account-controller');
// const initializePassport = require('../passport-config');

const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const LocalStrategy = require('passport-local').Strategy;

// ----------PASSPORT SET UP------------
// router.use(flash());
// router.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// router.use(passport.initialize());
// router.use(passport.session());
// router.use(methodOverride('_method'));

router.get('/', loginController.show);

// router.post(
//   '/login',
//   initializePassport.checkNotAuthenticated,
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true,
//   })
// );

// router.post('/login', (req, res) => {
//   initialize(passport, req.body.accountName, req.body.password);

//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true,
//   });
// });

// function initialize(passport, accountName, password) {
//   console.log('before passport.use');

//   const customFields = {
//     usernameField: accountName,
//     passwordField: password,
//   };

//   const verifyCallback = (username, password, done) => {
//     console.log('in callback');
//     user = accountController
//       .findOneByAccountName(username)
//       .then((user) => {
//         if (!user) {
//           return done(null, false);
//         }

//         const isValid = bcrypt.compare(password, user.password);

//         if (isValid) {
//           return done(null, user);
//         } else {
//           return done(null, false);
//         }
//       })
//       .catch((err) => {
//         done(err);
//       });
//   };
//   const strategy = new LocalStrategy(accountName, password, verifyCallback);
//   passport.use(strategy);

//   passport.use(
//     new LocalStrategy(function (accountName, password, done) {
//       console.log('in callback');
//       user = accountController
//         .findOneByAccountName(accountName)
//         .then((user) => {
//           if (!user) {
//             return done(null, false);
//           }

//           const isValid = bcrypt.compare(password, user.password);

//           if (isValid) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         })
//         .catch((err) => {
//           done(err);
//         });
//     })
//   );
//   console.log('after passport.use');
//   passport.serializeUser((user, done) => done(null, user.id));
//   passport.deserializeUser((id, done) => {
//     return done(null, accountController.findOneByAccountId(id));
//   });
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   next();
// }

module.exports = router;
