const mongoose = require('mongoose');

const project = new mongoose.Schema({
	cbAddress: {
		required: true,
		type: String,
	},
	projectId: {
		required: true,
		type: Number,
	},
	projectLabel: {
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

module.exports = mongoose.model('Project', project);
