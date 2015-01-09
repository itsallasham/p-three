var mongoose = require('mongoose');


var openingTimeSchema = new mongoose.Schema({
	days: {type: String, require: true},
	opening: String,
	closing: String,
	closed: {type: Boolean, required: true}
});

var reviewSchema = new mongoose.Schema({
	_id: {
		type: String
	},
	author: {
		displayName: String
	},
	rating: {type: Number, require: true, min: 0, max: 5},
	reviewText: String,
	createdOn: {type: Date, "default": Date.now}
});

var locationSchema = new mongoose.Schema({
	name: {type: String, required: true},
	address: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	facilities: [String],
	coords:{type: [Number], index: '2dshpere'},
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);

