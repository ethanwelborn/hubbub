var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

db = null;

var mongoUri = process.env.MONGOLAB_URI || 'localhost';

if (process.env.MONGOLAB_URI) {
    //heroku
    var dbConnectionOpen = function(err, database) {
        db = database;
        if (!err) {
            console.log("Connected to 'hubbubdb' database");
            db.collection('clients', {safe: true}, function(err, collection) {
                if (err) {
                    console.log("The 'clients' collection doesn't exist.");
                    populateDB();
                }
            });
        }
    };

    mongo.connect(mongoUri, {}, dbConnectionOpen);
}
else {
    // local dev
    var server = new Server(mongoUri, 27017, {auto_reconnect: true});
    db = new Db('hubbubdb', server, {safe: true});

    db.open(function(err, db) {
        if (!err) {
            console.log("Connected to 'hubbubdb' database");
            db.collection('clients', {strict: true}, function(err, collection) {
                if (err) {
                    console.log("The 'clients' collection doesn't exist.");
                    // populateDB();
                }
            })
        }
    });
}

exports.findAll = function(req, res) {
	db.collection('clients', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving client: ' + id);
    db.collection('clients', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.loginAs = function(req, res) {
    var username, password;
    username = req.body.username;
    password = req.body.password;
    console.log('Attempting login as: ' + username + ' with password ' + password);
    db.collection('clients', function(err, collection) {
        collection.findOne({'username': username, 'password': password}, function(err, item) {
            res.send(item);
        });
    });
};

exports.addClient = function(req, res) {
	var client = req.body;
	console.log('Adding client: ' + JSON.stringify(client));
	db.collection('clients', function(err, collection) {
		collection.insert(client, {safe: true}, function(err, result) {
			if (err) {
				res.send({'error': 'An error has occured - ' + err});
			}
			else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateClient = function(req, res) {
	var id = req.params.id;
	var client = req.body;
	console.log('Updating client: ' + id);
	console.log(JSON.stringify(client));
	db.collection('clients', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, client, {safe: true}, function(err, result) {
			if (err) {
				console.log('Error updating client: ' + err);
				res.send({'error': 'An error has occured.'});
			}
			else {
				console.log('' + result + ' document(s) updated');
				res.send(client);
			}
		});
	});
};

exports.deleteClient = function(req, res) {
    var id = req.params.id;
    console.log('Deleting client: ' + id);
    db.collection('clients', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe: true}, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            }
            else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {
 
    var clients = [
    {
        name: "CHATEAU DE SAINT COSME",
        year: "2009",
        grapes: "Grenache / Syrah",
        country: "France",
        region: "Southern Rhone",
        description: "The aromas of fruit and spice...",
        picture: "saint_cosme.jpg"
    },
    {
        name: "LAN RIOJA CRIANZA",
        year: "2006",
        grapes: "Tempranillo",
        country: "Spain",
        region: "Rioja",
        description: "A resurgence of interest in boutique vineyards...",
        picture: "lan_rioja.jpg"
    }];
 
    db.collection('clients', function(err, collection) {
        collection.insert(clients, {safe: true}, function(err, result) {});
    });
 
};