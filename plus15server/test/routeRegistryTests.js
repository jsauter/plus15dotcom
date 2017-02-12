var assert = require('assert');
var RouteRegistry = require('../routeRegistry.js');
var express = require('express');

suite('route registry tests', function() {
  test('can create route registry', function() {
    
    var app = express();
    var routeRegistry = new RouteRegistry(app);

    assert.ok(routeRegistry);
  });

  test('routes are as expected', function() {

  	var app = express();
  	var routeRegistry = new RouteRegistry(app);
     
    routeRegistry.setupRoutes();
     
    assert.ok(app.routes.get[0].path == '/');    
    assert.ok(app.routes.get[1].path == '/locations');
    
  });
});