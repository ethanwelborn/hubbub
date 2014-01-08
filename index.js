var app = require('express').createServer();
app.get('/', function(req, res) {
	res.send('Sup wigga');
});
app.listen(process.env.VCAP_APP_PORT || 3000);
