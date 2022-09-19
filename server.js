const express = require('express');

const app = express();

app.use(express.static("dist/"));

app.get('/', function(req, res){
  res.redirect('/home/index.html');
});

app.get('/messenger', function(req, res){
  res.redirect('/messenger/messenger.html');
});

app.get('/register', function(req, res){
  res.redirect('/register/register.html');
});

app.get('/about', function(req, res){
  res.redirect('/about/about.html');
});

app.get('/404', function(req, res){
  res.redirect('/404/404.html');
});

app.get('/500', function(req, res){
  res.redirect('/500/500.html');
});
