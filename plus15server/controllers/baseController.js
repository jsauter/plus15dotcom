var BaseController = function() {

}

BaseController.prototype = {
	render : function(res, view, viewModel) {
		res.render(view, viewModel);
	},
	json : function(res, viewModel) {
		res.json(viewModel);
	}

}

module.exports = BaseController;