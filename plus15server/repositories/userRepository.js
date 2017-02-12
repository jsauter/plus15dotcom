var mongoose = require('mongoose');
var BaseRepository = require('./baseRepository.js');
var models = require('./../models/models.js').initialize();

var UserRepository = function() {
	this.baseRepository = new BaseRepository();
};

UserRepository.prototype = {
	getUserByName : function(name, callback) {
		console.log('user repository');

		var db = this.baseRepository.getMongoDbConnection();

		var User = db.model('User');

		console.log("username : " + name);
		User.findOne({ 'userid': name }, function (err, user) {
			console.log("found user : " + user);
			callback(user);
		});
	}
};

module.exports = UserRepository;