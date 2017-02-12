var gateways = require('./../gateways/');
var services = require('./../services/');
var BaseController = require("./baseController.js");

var base;

var LocationController = function() {
	base = new BaseController();
};

LocationController.prototype = {

	getLocations : function(req, res) {

		console.log("Entering location controller.");

			var service = new services.ShawHotspotsService();

			service.getShawHotspotsByProximity(function(result){
			
			base.json(res, result);
		});
	}

};

module.exports = LocationController;