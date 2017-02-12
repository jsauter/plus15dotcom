var mongoose = require('mongoose');

var BaseRepository = function() {

};

BaseRepository.prototype = {
	getMongoDbConnection : function() {
		return mongoose.createConnection('localhost', 'plus15db');
	}
};

module.exports = BaseRepository;