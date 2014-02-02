var express = require('express'),
	path = require('path'),
    http = require('http'),
	client = require('./routes/clients'),
	merchant = require('./routes/merchants');

var app = express();

app.configure(function() {
	app.set('port', process.env.PORT || 5000);
	app.set('view engine', 'jade');
	app.set('views', __dirname);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use('/components', express.static(path.join(__dirname, 'bower_components')));
  	app.use('/js', express.static(path.join(__dirname, 'client')));
  	app.use('/style', express.static(path.join(__dirname, 'client/assets/style/stylesheets')));
});

app.get('/', function(req, res) {
	res.render('index.jade');
});

app.get('/templates/:name', function (req, res)
	{ var name = req.params.name;
	res.render('client/templates/' + name);
});

/**
 * Client Routes
 */
app.get('/api/v1/clients', client.findAll);
app.get('/api/v1/clients/:id', client.findById);
app.post('/api/v1/clients', client.addClient);
app.put('/api/v1/clients/:id', client.updateClient);
app.delete('/api/v1/clients/:id', client.deleteClient);

/**
 * Merchant Routes
 */
app.get('/api/v1/merchants', merchant.findAll);
app.get('/api/v1/merchants/:id', merchant.findById);
app.post('/api/v1/merchants', merchant.addMerchant);
app.put('/api/v1/merchants/:id', merchant.updateMerchant);
app.delete('/api/v1/merchants/:id', merchant.deleteMerchant);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});