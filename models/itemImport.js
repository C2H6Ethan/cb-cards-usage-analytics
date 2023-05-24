const mongoose = require('mongoose');

const itemImport = new mongoose.Schema({
	totalItems: {
		required: true,
		type: Number,
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

module.exports = mongoose.model('ItemImport', itemImport);
