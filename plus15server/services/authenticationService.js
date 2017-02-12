var UserRepository = require('./../repositories').UserRepository;

var AuthenticationService = function() {

};

AuthenticationService.prototype = {
	findByUsername: function(userName, callback) {
		console.log("user service");

		var userRepository = new UserRepository();

		userRepository.getUserByName(userName, function(user) {
			callback(null, user);
		});

    }
};

module.exports = AuthenticationService;