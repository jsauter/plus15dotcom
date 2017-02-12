var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

module.exports = function() {

	console.log('Initializing user schema');

    var User = new Schema({
        name     : String
      , userid      : String
      , password      : String
      , isAdmin			: String
    });
    
    mongoose.model("User", User);
};
