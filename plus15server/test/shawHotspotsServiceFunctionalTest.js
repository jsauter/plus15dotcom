var assert = require('assert');
var services = require('./../services/');


suite("shaw hot spots service functional tests", function() {
	test("load shaw data", function(done) {
	
		var hotspotService = new services.ShawHotspotsService();

		hotspotService.getShawHotspotsByProximity(function(result) {

			console.log("Number of results returned: " + result.length);
			assert.ok(result.length > 0);

			done();
		});
	});
});

