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
            db.collection('interactions', {safe: true}, function(err, collection) {
                if (err) {
                    console.log("The 'interactions' collection doesn't exist.");
                    //populateDB();
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
            db.collection('interactions', {strict: true}, function(err, collection) {
                if (err) {
                    // console.log("The 'clients' collection doesn't exist. Creating it with sample data..");
                    // populateDB();
                }
            })
        }
    });
}

exports.findAll = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving interactions for: ' + id);
	db.collection('interactions', function(err, collection) {
		collection.find( { $or: [ {'clientId': id}, {'merchantId': id} ] }).toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.findInteractions = function(req, res) {
    var clientId = req.params.clientId;
    var merchantId = req.params.merchantId;
    console.log('Retrieving interactions for: ' + clientId + ' and: ' + merchantId);
    db.collection('interactions', function(err, collection) {
        collection.find( { $and: [ {'clientId': clientId}, {'merchantId': merchantId} ] }).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving interaction: ' + id);
    db.collection('interactions', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.addInteraction = function(req, res) {
	var interaction = req.body;
    var secretKey = interaction.merchantSecretKey;
    var merchantId = interaction.merchantId;
    var matchedMerchant = null;

	console.log('Adding interaction: ' + JSON.stringify(interaction));

    // verify merchant secret key
    db.collection('merchants', function(err, collection) {
        collection.find( { $and: [ {'secretKey': secretKey}, {'_id': merchantId} ] }).toArray(function(err, items) {
            matchedMerchant = items;
            console.log("Matched merchant key to existing merchant.");
        });
    });

    if (null != matchedMerchant) {
    	db.collection('interactions', function(err, collection) {
    		collection.insert(interaction, {safe: true}, function(err, result) {
    			if (err) {
    				res.send({'error': 'An error has occured - ' + err});
    			}
    			else {
    				console.log('Success: ' + JSON.stringify(result[0]));
    				res.send(result[0]);
    			}
    		});
    	});
    }
    else {
        console.log("Failed to match " + secretKey + " and " + merchantId + " to database.");
    }
};

exports.updateInteraction = function(req, res) {
	var id = req.params.id;
	var interaction = req.body;
	console.log('Updating interaction: ' + id);
	console.log(JSON.stringify(interaction));
	db.collection('interactions', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, interaction, {safe: true}, function(err, result) {
			if (err) {
				console.log('Error updating interaction: ' + err);
				res.send({'error': 'An error has occured.'});
			}
			else {
				console.log('' + result + ' document(s) updated');
				res.send(interaction);
			}
		});
	});
};

exports.deleteInteraction = function(req, res) {
    var id = req.params.id;
    console.log('Deleting interaction: ' + id);
    db.collection('interactions', function(err, collection) {
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
 
    var interactions = [
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
 
    db.collection('interactions', function(err, collection) {
        collection.insert(interactions, {safe: true}, function(err, result) {});
    });
 
};