var express = require('express'),
	path = require('path'),
    http = require('http'),
	client = require('./routes/clients'),
	merchant = require('./routes/merchants'),
	interaction = require('./routes/interactions');

var app = express();
var wwwhisper;

// wwwhisper setup for heroku
if (process.env.PORT) {
	wwwhisper = require('connect-wwwhisper');
	app.use(wwwhisper(false));
}

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
  	app.use('/img', express.static(path.join(__dirname, 'client/assets/img')));
  	app.use('/css', express.static(path.join(__dirname, 'client/assets/gumby/css')));
  	app.use('/fonts', express.static(path.join(__dirname, 'client/assets/gumby/fonts')));
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
app.post('/api/v1/clients/attempt/login', client.loginAs);
app.post('/api/v1/clients', client.addClient);
app.put('/api/v1/clients/:id', client.updateClient);
app.delete('/api/v1/clients/:id', client.deleteClient);

/**
 * Merchant Routes
 */
app.get('/api/v1/merchants', merchant.findAll);
app.get('/api/v1/merchants/:id', merchant.findById);
app.post('/api/v1/merchants/attempt/login', merchant.loginAs);
app.post('/api/v1/merchants', merchant.addMerchant);
app.put('/api/v1/merchants/:id', merchant.updateMerchant);
app.delete('/api/v1/merchants/:id', merchant.deleteMerchant);

/**
 * Interaction Routes
 */
app.get('/api/v1/interactions/all/:id', interaction.findAll);
app.get('/api/v1/interactions/:id', interaction.findById);
app.post('/api/v1/interactions', interaction.addInteraction);
app.put('/api/v1/interactions/:id', interaction.updateInteraction);
app.delete('/api/v1/interactions/:id', interaction.deleteInteraction);
app.get('/api/v1/interactions/:clientId/:merchantId', interaction.findInteractions)


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});