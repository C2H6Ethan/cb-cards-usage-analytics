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
	timesSelected: {
		required: true,
		type: Number,
	},
});

module.exports = mongoose.model('Project', project);
