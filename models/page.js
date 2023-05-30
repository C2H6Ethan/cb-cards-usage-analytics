const mongoose = require('mongoose');

const page = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	user: {
		required: true,
		type: String,
	},
	date: {
		required: true,
		type: Date,
	},
});

module.exports = mongoose.model('Page', page);
