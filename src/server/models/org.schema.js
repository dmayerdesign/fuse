const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	name: String,
	description: String,
	dateCreated: {type: Date, default: Date.now()},
	donateLinks: [String],
	learnMoreLinks: [String],
	images: [String],
	facebook: String,
	stars: Number
});