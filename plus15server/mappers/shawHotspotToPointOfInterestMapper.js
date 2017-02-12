var viewmodels = require('./../viewmodels');

var ShawHotspotToPointOfInterestMapper = function() {

};

ShawHotspotToPointOfInterestMapper.prototype = {

	map : function(hotspots) {
		
		var pointsOfInterest = [];

		for(var hotspot in hotspots)
		{
			var pointOfInterest = new viewmodels.PointOfInterest();
			var enums = new viewmodels.Enums();
			
			pointOfInterest.Name = hotspots[hotspot].NameOfBusiness;
			pointOfInterest.Latitude = hotspots[hotspot].LatLon.Latitude;
			pointOfInterest.Longitude = hotspots[hotspot].LatLon.Longitude;
			pointOfInterest.Type = enums.PointOfInterestTypes.ShawHotspot;
			
			pointsOfInterest.push(pointOfInterest);
		}

		return pointsOfInterest;
	}

};

module.exports = ShawHotspotToPointOfInterestMapper;