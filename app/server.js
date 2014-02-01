var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.render('index.jade');
});

app.get('/api/v1/clients', function(req, res) {

});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(5000, '127.0.0.1');