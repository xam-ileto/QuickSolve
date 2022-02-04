const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Account = require('./database/models/Account');
const Post = require('./database/models/Post');

const app = express();
const port = 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

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
// accounts db name: quicksolve-accounts
mongoose.connect('mongodb+srv://admin:1234@start.fowxh.mongodb.net/quicksolve');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------HANDLEBARS ROUTING---------------------
// main pages
app.get('/', function (req, res) {
  var data = {
    isLoggedIn: false,
  };
  res.render('index', data);
});

app.get('/index-logged-in', function (req, res) {
  var data = {
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    accountName: 'NancyLandgraab',
  };
  res.render('index', data);
});

app.get('/account', function (req, res) {
  var data = {
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    layout: 'account.hbs',
    accountName: 'NancyLandgraab',
  };
  res.render('index', data);
});

// post pages
app.get('/post', (req, res) => {
  var data = {
    layout: 'post.hbs',
  };
  res.render('index', data);
});

// account details pages
app.get('/edit-account', function (req, res) {
  var data = {
    title: 'Edit Account',
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    isEdit: true,
    layout: 'account-details.hbs',
    accountName: 'NancyLandgraab',
  };
  res.render('index', data);
});

app.get('/view-account', function (req, res) {
  var data = {
    title: 'View Account',
    isLoggedIn: true,
    // for search icon
    isInIndex: true,
    isEdit: false,
    layout: 'account-details.hbs',
    accountName: 'NancyLandgraab',
  };
  res.render('index', data);
});

// box pages

// big box pages- Login and Register
app.get('/login', function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Login',
    isLogin: true,
    isBigBox: true,
  };
  res.render('index', data);
});

app.get('/register', function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Register',
    isLogin: false,
    isBigBox: true,
  };
  res.render('index', data);
});

// small box pages
// small box- Post and Search
app.get('/post', function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Post',

    text1: 'Question',
    text2: 'Post',
  };
  res.render('index', data);
});

app.get('/search', function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Search',

    text1: 'Search',
    text2: 'Search',
  };
  res.render('index', data);
});
// small box- edit post and edit comment
app.get('/editpost', function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Edit Post',

    text1: 'Edit Post',
    text2: 'Post',
  };
  res.render('index', data);
});

app.get('/editcomment', function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Edit Comment',

    text1: 'Edit Comment',
    text2: 'Post',
  };
  res.render('index', data);
});

// -------------------POST AND GET REQUESTS--------------
// ***accounts***
app.get('/create-account', (req, res) => {
  sampleAccount = {
    accountName: 'test',
    password: '1234',
  };

  Account.create(sampleAccount, (error, post) => {
    // send user to login once account created
    res.redirect('/login');
  });
});

// ***posts***
