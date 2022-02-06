const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
// const Account = require('./database/models/Account');
const accountController = require('./controller/account-controller.js');

function initialize(passport) {
  const authenticateUser = async (accountName, password, done) => {
    // console.log('auth');
    // console.log('passed account name: ' + accountName);
    const user = await accountController.findOneByAccountName(accountName);

    // console.log('finished promise');
    // const user = getByAccountName(accountName);
    // console.log(user);
    // console.log('reaching end of auth');
    // return done(null, false, { message: 'No user with that email' });
    if (user == null) {
      //   console.log('user null');
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      return done(e);
    }
  };

  //   console.log('1');
  passport.use(
    new LocalStrategy({ usernameField: 'accountName' }, authenticateUser)
  );
  //   console.log('3');
  passport.serializeUser((user, done) => {
    // console.log('serializing');
    // console.log('user id: ' + user._id);
    done(null, user._id);
  });
  //   console.log('4');
  passport.deserializeUser(async (_id, done) => {
    // console.log('in deserialize');
    result = await accountController.findOneById(_id);
    // console.log(result);
    return done(null, result);
  });
  //   console.log('5');
  //   console.log(' ');
}

module.exports = initialize;
