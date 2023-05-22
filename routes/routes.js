const express = require('express');
const router = express.Router();
const Model = require('../models/model');

//Post Method
router.post('/post', async (req, res) => {
	const action = new Model({
		type: req.body.type,
		user: req.body.user,
		date: req.body.date,
	});

	try {
		const dataToSave = action.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Get all Method
router.get('/getAll', async (req, res) => {
	try {
		const data = await Model.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const result = await Model.findByIdAndUpdate(id, updatedData, options);

		res.send(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = await Model.findByIdAndDelete(id);
		res.send(`Document has been deleted..`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
