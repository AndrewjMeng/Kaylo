const express = require('express');
const http = require('http');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('.'));

app.get('/', function(req, res){
  res.sendFile( __dirname + '/elmcrest.html');
})
app.set('port', port);
const ip = "127.0.0.1";
const server = app.listen(app.get('port'));
console.log('Listening on port ', port);