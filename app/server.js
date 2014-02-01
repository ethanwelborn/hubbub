var express = require('express'),
	client = require('./routes/clients');

var app = express();

app.configure(function() {
	app.set('view engine', 'jade');
	app.set('views', __dirname);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.static(__dirname + 'app'));
});

app.get('/', function(req, res) {
  res.render('index.jade');
});

/**
 * Client Routes
 */
app.get('/api/v1/clients', client.findAll);
app.get('/api/v1/clients/:id', client.findById);
app.post('/api/v1/clients', client.addClient);
app.put('/api/v1/clients/:id', client.updateClient);
app.delete('/api/v1/clients/:id', client.deleteClient);


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on port " + port + "...");
});