var assert = require('assert');
var mongoose = require('mongoose');
var models = require('./../models/models.js').initialize();

suite('build database', function() {

	test('drop collections', function(done) {
		dropCollection('User');
		done();
	});


	test('build users', function(done) {

		var db = mongoose.createConnection('localhost', 'plus15db');

		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {

			var User = db.model('User');

			var me = new User({
				name: "Jonathan Sauter",
				userid: 'jsauter',
				password: 'jsauter',
				isAdmin: 'true'
			});

			me.save(function(err) {
				if (err) res.end('FAIL');
			})
			console.log("Users created.")
			done();
		}.bind(done));
	});

})

var dropCollection = function(typeName, obj) {

		var db = mongoose.createConnection('localhost', 'plus15db');

		db.once('open', function() {
			var object = db.model(typeName);

			var dropType = new object;

			console.log('dropping ' + typeName + ' data');
			
			dropType.collection.drop();

			});
	
}