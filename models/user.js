const mongoose = require('mongoose');

const user = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
});

module.exports = mongoose.model('User', user);
