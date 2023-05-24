const mongoose = require('mongoose');

const page = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	timesOpened: {
		required: true,
		type: Number,
	},
});

module.exports = mongoose.model('Page', page);
