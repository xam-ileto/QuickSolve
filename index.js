const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

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

// routing methods
// main pages
app.get('/', function (req, res) {
  var data = {
    isLoggedIn: false,
  };
  res.render('index', data);
});

app.get('/indexLoggedIn', function (req, res) {
  var data = {
    isLoggedIn: true,
    isInIndex: true,
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
