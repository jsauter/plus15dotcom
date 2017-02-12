var assert = require('assert');
var ShawHotspotsParser = require('./../parsers/shawHotspotsParser.js');
var ShawHotspotMapper = require('./../mappers/ShawHotspotToPointOfInterestMapper.js');
var viewmodels = require('./../viewmodels');

var fs = require('fs');

suite('can map to point of interest', function() {
	test('can map from shaw hot spot', function(done) {

		fs.readFile('./test/testdata/shawTestData.txt', 'utf8', function(err, data) {
			
			var parser = new ShawHotspotsParser();

			var result = parser.parseGatewayResults(data);

			var mapper = new ShawHotspotMapper();

			var pointsOfInterest = mapper.map(result);
			
			var enums = new viewmodels.Enums();
		

			for(var i in pointsOfInterest) {

				assert.equal(pointsOfInterest[i].Name, "SUBWAY");
				assert.equal(pointsOfInterest[i].Latitude, 51.14191);
				assert.equal(pointsOfInterest[i].Longitude, -114.07051);
				assert.equal(pointsOfInterest[i].Type, enums.PointOfInterestTypes.ShawHotspot);
			}

			done();	

		});
	})
});
