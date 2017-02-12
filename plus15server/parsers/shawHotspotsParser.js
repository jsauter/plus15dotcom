var ShawHotspotsParser = function() {

	this.cleanseData = function(resultString) {
	
		if(resultString.indexOf('var mySpots = ') != -1) {
			return resultString.replace('var mySpots = ', '');
		}

		return resultString;
	}

};

ShawHotspotsParser.prototype = {

	parseGatewayResults : function(resultString) {

		var cleansedString = this.cleanseData(resultString);

		var jsonResult = JSON.parse(cleansedString);

		return jsonResult;
	}
};

module.exports = ShawHotspotsParser;