const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	name: String,
	description: String,
	dateCreated: {type: Date, default: Date.now()},
	donateLink: String,
	website: String,
	facebook: String,
	stars: Number,
	
	coverImage: String,
	gravatar: String,
	gallery: [String]
})