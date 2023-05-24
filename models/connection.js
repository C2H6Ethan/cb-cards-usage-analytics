const mongoose = require('mongoose');

const connection = new mongoose.Schema({
	user: {
		required: true,
		type: String,
	},
	cbAddress: {
		required: true,
		type: String,
	},
	date: {
		required: true,
		type: Date,
	},
});

module.exports = mongoose.model('Connection', connection);
