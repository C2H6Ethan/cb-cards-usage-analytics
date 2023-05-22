const mongoose = require('mongoose');

const action = new mongoose.Schema({
	type: {
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

module.exports = mongoose.model('Data', action);
