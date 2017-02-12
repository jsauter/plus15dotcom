var assert = require('assert');
var ShawHotspotsGateway = require('./../gateways/ShawHotspotsGateway.js');
var config = require('./../config.js');

suite('can connect to shaw locations file', function() {
  test('can load file', function(done) {

        var hotspotGateway = new ShawHotspotsGateway(config);

        hotspotGateway.getHotspots(function(body){
        assert.ok(body);

		done();
      });

    });

  });
  