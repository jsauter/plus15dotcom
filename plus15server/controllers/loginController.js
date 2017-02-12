var passport = require('passport');
var BaseController = require("./baseController.js");
var express = require('express');
var base;

var LoginController = function() {
	base = new BaseController();
};

LoginController.prototype = {

	login : function(req, res) {
			console.log('GET for Login page being handled');
			res.render('login', { title: 'Login', message: 'Please Login' });		},

	logout : function(req, res) {
		console.log("Logging out user");

		req.logout();
		res.redirect('/login');
	},

	redirect : function(req, res) {
		res.redirect('/manage');
	}
};



module.exports = LoginController;