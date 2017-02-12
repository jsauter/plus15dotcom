var assert = require('assert');
var inside = require('point-in-polygon');
var data = require('../data/downtownPolygon.js');

suite("point in basic polygon tests", function() {
	test("inside normal polygon", function(done) {

		var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];

		var point = [1,1]
		
		assert.equal(true,inside(point, polygon));

		done();
	}),
	test("outside of normal polygon negative", function(done) {

		var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];

		var point = [-1,-1]
		
		assert.equal(false,inside(point, polygon));

		done();
	}),
	test("outside of normal polygon positive", function(done) {

		var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];

		var point = [3,3]
		
		assert.equal(false,inside(point, polygon));

		done();
	}),
	test("inside of negative polygon ", function(done) {

		var polygon = [ [ -10, -10 ], [ -10, 10 ], [ 10, 10 ], [ 10, -10 ] ];

		var point = [3,3]
		
		assert.equal(true,inside(point, polygon));

		done();
	}),
	test("outside of negative polygon ", function(done) {

		var polygon = [ [ -10, -10 ], [ -10, 10 ], [ 10, 10 ], [ 10, -10 ] ];

		var point = [-11,-11]
		
		assert.equal(false,inside(point, polygon));

		done();
	}),
	test("outside of negative polygon with decimals ", function(done) {

		var polygon = [ [ -10.123123, -10.123123 ], [ -10.123123, 10.123123 ], [ 10.123123, 10.123123 ], [ 10.123123, -10.123123 ] ];

		var point = [-11.123123,-11.123123]
		
		assert.equal(false,inside(point, polygon));

		done();
	}),
	test("inside of negative polygon with decimals ", function(done) {

		var polygon = [ [ -10.123123, -10.123123 ], [ -10.123123, 10.123123 ], [ 10.123123, 10.123123 ], [ 10.123123, -10.123123 ] ];

		var point = [-9.123123,-9.123123]
		
		assert.equal(true,inside(point, polygon));

		done();
	});

});

suite("point in downtown polygon tests", function() {

	var polygon = [];

	setup(function(done) {

		polygon = [];

		for(var i in data)
		{
			polygon.push([data[i][0], data[i][1]]);
		}

		done();
	});

	test('outside downtown polygon', function(done) {

		var point = [52, -155];

		assert.equal(false, inside(point, polygon));

		done();
	}),


	test('inside downtown polygon', function(done) {

		var point = [51.04995, -114.06793];
		var result = inside(point, polygon);
		
		assert.equal(true, result);

		done();
	})


	test('just outside downtown polygon', function(done) {

		var point = [51.05684, -114.06961];

		assert.equal(false, inside(point, polygon));

		done();
	})


	test('just inside downtown polygon', function(done) {

		var point = [51.04466, -114.05866];

		assert.equal(true, inside(point, polygon));

		done();
	})


	test('inside downtown polygon high precision real data', function(done) {

		var point = [51.048608, -114.076302];

		assert.equal(true, inside(point, polygon));

		done();
	})


	test('outside downtown polygon high precision real data', function(done) {

		var point = [53.546525, -113.514936];

		assert.equal(false, inside(point, polygon));

		done();
	})
});
