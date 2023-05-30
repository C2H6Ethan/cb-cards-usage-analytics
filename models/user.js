const mongoose = require('mongoose');

const user = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	date: {
		required: true,
		type: Date,
	},
});

module.exports = mongoose.model('User', user);
