var BaseController = require("./baseController.js");

var base;

var ManageController = function() {
	base = new BaseController();
}

ManageController.prototype = {

	getLocations : function(req, res) {

		console.log("Entering manage controller.");

		
		
				res.render('manage', { title: 'Manage' });				
		}
}

module.exports = ManageController;