var express = require("express");
var mongoose = require('mongoose');
 
var app = express();
app.use(express.logger());

// Configuration

app.configure(function() {
	app.set('view engine', 'jade');
	app.set('views', __dirname);
	app.use(express.static(__dirname + 'app'));
});

app.get('/', function(req, res) {
  res.render('index.jade');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/HelloMongoose';

mongoose.connect(uristring, function (err, res) {
	if (err) {
		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + uristring);
}
});
