const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const accountController = require('./controller/account-controller.js');

function initialize(passport) {
  const authenticateUser = async (accountName, password, done) => {
    const user = await accountController.findOneByAccountName(accountName);

    if (user == null) {
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

  passport.use(
    new LocalStrategy({ usernameField: 'accountName' }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (_id, done) => {
    result = await accountController.findOneById(_id);
    return done(null, result);
  });
}

module.exports = initialize;
