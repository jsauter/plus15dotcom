var gateways = require('./../gateways');
var mappers = require('./../mappers');
var config = require('./../config.js');

var ShawHotspotsService = function() {

};

ShawHotspotsService.prototype = {
	getShawHotspotsByProximity : function (callback) {

		var shawHotspotGateway = new gateways.ShawHotspotsGateway(config);

		shawHotspotGateway.getHotspots(function(response) {

			var mapper = new mappers.ShawHotspotToPointOfInterestMapper();

			var mappingResult = mapper.map(response);

			callback(mappingResult);
		});
	}
};

module.exports = ShawHotspotsService;