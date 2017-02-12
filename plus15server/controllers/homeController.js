var utils = require('./../utils/');
var gateways = require('./../gateways/');
var services = require('./../services/');
var BaseController = require('./baseController.js');

var base;

var HomeController = function() {
	base = new BaseController();
}

HomeController.prototype = {

	getIndex : function(req, res) {
			
			console.log("Entering home controller.");
		
			base.render(res, "index", {title: "plus15.ca"});
		}
}


module.exports = HomeController;