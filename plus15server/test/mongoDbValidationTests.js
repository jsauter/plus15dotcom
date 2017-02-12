var assert = require('assert');
var mongoose = require('mongoose');
var models = require('./../models/models.js').initialize();

suite('mongo db', function() {
	setup(function() {
var db = mongoose.createConnection('localhost', 'plus15db');

		db.once('open', function() {
			var USER = db.model('User');

			var user = new USER();
			
			console.log('dropping data');
			console.log(user.collection);
			user.collection.drop();

			});

	});

	test('can connect to mongo db', function(done) {

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
			});
			done();
		}.bind(done));
	});
});