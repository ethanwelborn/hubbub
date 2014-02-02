var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mydb';

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('hubbubdb', server);

db.open(function(err, db) {
	if (!err) {
		console.log("Connected to 'hubbubdb' database");
		db.collection('merchants', {strict: true}, function(err, collection) {
			if (err) {
				console.log("The 'merchants' collection doesn't exist. Creating it with sample data..");
				populateDB();
			}
		})
	}
});

exports.findAll = function(req, res) {
	db.collection('merchants', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving merchant: ' + id);
    db.collection('merchants', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.addMerchant = function(req, res) {
	var merchant = req.body;
	console.log('Adding merchant: ' + JSON.stringify(merchant));
	db.collection('merchant', function(err, collection) {
		collection.insert(merchant, {safe: true}, function(err, result) {
			if (err) {
				res.send({'error': 'An error has occured.'});
			}
			else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
};

exports.updateMerchant = function(req, res) {
	var id = req.params.id;
	var merchant = req.body;
	console.log('Updating merchant: ' + id);
	console.log(JSON.stringify(merchant));
	db.collection('merchants', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, merchant, {safe: true}, function(err, result) {
			if (err) {
				console.log('Error updating merchant: ' + err);
				res.send({'error': 'An error has occured.'});
			}
			else {
				console.log('' + result + ' document(s) updated');
				res.send(merchant);
			}
		});
	});
};

exports.deleteMerchant = function(req, res) {
    var id = req.params.id;
    console.log('Deleting merchant: ' + id);
    db.collection('merchants', function(err, collection) {
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
 
    var merchants = [
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
 
    db.collection('merchants', function(err, collection) {
        collection.insert(merchants, {safe: true}, function(err, result) {});
    });
 
};