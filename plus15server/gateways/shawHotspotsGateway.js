var request = require('request');
var cache = require('memory-cache');
var parser = require('./../parsers');
var polygon = require('../data/downtownPolygon.js');
var inside = require('point-in-polygon');

var ShawHotspotsGateway  = function(config) {
	this.config = config;

    this.callShawServices = function(callback) {

        request(this.config.shaw.hotspotUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {

                var gatewayParser = new parser.ShawHotspotsParser();

                var result = gatewayParser.parseGatewayResults(body);

                callback(result);
            }
            else {
                console.log("Error: " + error);
                console.log("Status code: " + response.statusCode);
                callback(null);
            }
        });
    };

    this.filterHotspots = function(result, callback) {
        
        console.log("Filtering results");
        var filteredResult = [];

        for(var i in result)
        {
            var point = [result[i].LatLon.Latitude,result[i].LatLon.Longitude];

            if(inside(point, polygon))
            {
                filteredResult.push(result[i]);
            }
            
        }
        
        callback(filteredResult);
    };
};

ShawHotspotsGateway.prototype = {

    getHotspots : function (callback) {

            console.log("Request to shaw hotspot gateway...");

            if(this.config.shaw.cacheData === true)
            {
                console.log("Shaw caching enabled.");

                if(cache.get('shawCache') === null)
                {
                    console.log("Shaw cache invalid, reloading, valid for " + this.config.shaw.cacheTimeout + "ms");

                    this.callShawServices(function(result) {

                            this.filterHotspots(result, function(res) {
                                cache.put('shawCache', res, this.config.shaw.cacheTimeout);
                                callback(res);
                            
                            }.bind(this));

                        }.bind(this));

                }
                else {
                    console.log("Shaw cache valid, loading.");
                    callback(cache.get('shawCache'));
                }
            }
            else
            {
                console.log("Shaw caching disabled.");
                
                this.callShawServices(function(result) {
                
                    this.filterHotspots(result, function(res) {
                        callback(res);
                    });

                }.bind(this));
            }
		}
};

module.exports = ShawHotspotsGateway;