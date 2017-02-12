var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

	console.log('Initializing Point Of Interes schema');

    var PointOfInterest = new Schema({
        name     : String
      , latitude      : String
      , longitude      : String
      , type		: String
    });
    
    mongoose.model("PointOfInterest", PointOfInterest);
};
