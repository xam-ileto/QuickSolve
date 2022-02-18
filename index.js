// STUFF FOR PASSPORT
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const express = require('express');
const exphbs = require('express-handlebars');

const accountRouter = require('./routes/account-router.js');
const registerRouter = require('./routes/register-router.js');
const postRouter = require('./routes/post-router.js');
const viewRouter = require('./routes/view-router.js');

const authenticator = require('./authenticator.js');

const { envPort, sessionKey } = require('./config');

const app = express();
const port = envPort || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

// MORE AUTH SET UP
const initializePassport = require('./passport-config');
initializePassport(passport);

app.use(flash());
app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// --------HANDLEBARS SET UP-----------------
// need to declare where the public folder is
app.use(express.static(__dirname + '/public'));

// set handlebar as app's view engine
app.engine(
  'hbs',
  exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
  })
);

app.set('view engine', 'hbs');

// ------------------MONGODB SET UP-----------------------
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// ------------------HANDLEBARS ROUTING---------------------

// big box pages- Login and Register
app.get('/login', authenticator.checkNotAuthenticated, function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Login',
    isLogin: true,
    isBigBox: true,
    isLoginOrRegister: true,
  };

  res.render('index', data);
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/index-logged-in',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

app.use('/account', accountRouter);
app.use('/register', registerRouter);
app.use('/post', postRouter);
app.use('/', viewRouter);
