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
// home page
app.get('/', function (req, res) {
  res.render('index');
});

// box pages
app.get('/login', function (req, res) {
  var data = {
    layout: 'boxpage.hbs',
    title: 'Login',
  };
  res.render('index', data);
});
