// STUFF FOR PASSPORT
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const accountController = require('./controller/account-controller.js');
const loginController = require('./controller/login-controller.js');
const bodyParser = require('body-parser');

const express = require('express');
const exphbs = require('express-handlebars');

const accountRouter = require('./routes/account-router.js');
const registerRouter = require('./routes/register-router.js');
const postRouter = require('./routes/post-router.js');
const viewRouter = require('./routes/view-router.js');

const authenticator = require('./authenticator.js');

const app = express();
const port = 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

// MORE AUTH SET UP
const initializePassport = require('./passport-config');
initializePassport(passport);

app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
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
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// ------------------HANDLEBARS ROUTING---------------------
// main pages
app.get('/', function (req, res) {
  var data = {
    isLoggedIn: false,
  };
  console.log('index');
  res.render('index', data);
});

// big box pages- Login and Register
app.get('/login', function (req, res) {
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
  authenticator.checkNotAuthenticated,
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

// app.get('/', loginController.show);

app.use('/account', accountRouter);
app.use('/register', registerRouter);
app.use('/post', postRouter);
app.use('/index-logged-in', viewRouter);
