const mongoose = require('mongoose');

const error = new mongoose.Schema({
	message: {
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

module.exports = mongoose.model('Error', error);
