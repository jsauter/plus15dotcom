var mongoose = require('mongoose');
var BaseRepository = require('./baseRepository.js');
var models = require('./../models/models.js').initialize();

var ShawPointOfInterestRepository = function() {
	this.baseRepository = new BaseRepository();
};

module.exports = ShawPointOfInterestRepository;