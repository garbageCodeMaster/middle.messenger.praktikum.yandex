const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static("dist/"));

app.get('/', function(req, res){
  res.redirect('/home/index.html');
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 