var assert = require('assert');
var ShawHotspotsParser = require('./../parsers/shawHotspotsParser.js');
var fs = require('fs');

suite('can parse json result', function() {
	test('can parse any json', function(done) {

		var parser = new ShawHotspotsParser();

		var result = parser.parseGatewayResults('{ "name": "test"}');
		
		assert.ok(result.name);
			
		done();
	}),
	test('can parse shaw like data', function(done) {

		fs.readFile('./test/testdata/shawTestData.txt', 'utf8', function(err, data) {
			
			var parser = new ShawHotspotsParser();

			var result = parser.parseGatewayResults(data);

			assert.ok(result);
			done();	

		});
	})
});

