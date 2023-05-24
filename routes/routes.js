const express = require('express');
const router = express.Router();
const actionModel = require('../models/action');
const projectModel = require('../models/project');
const pageModel = require('../models/page');
const connectionModel = require('../models/connection');
const userModel = require('../models/user');
const itemImportModel = require('../models/itemImport');

//Action Post Method
router.post('/action', async (req, res) => {
	const action = new actionModel({
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

//Project loaded Post Method
router.post('/project', async (req, res) => {
	//check if project has already been selected before
	const project = await projectModel.findOne({
		projectId: req.body.projectId,
	});

	if (project) {
		project.timesSelected += 1;

		try {
			const dataToSave = project.save();
			res.status(200).json(dataToSave);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	} else {
		const project = new projectModel({
			cbAddress: req.body.cbAddress,
			projectId: req.body.projectId,
			projectLabel: req.body.projectLabel,
			timesSelected: 1,
		});

		try {
			const dataToSave = project.save();
			res.status(200).json(dataToSave);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
});

//Page opened Post Method
router.post('/page', async (req, res) => {
	//check if project has already been selected before
	const page = await pageModel.findOne({
		name: req.body.name,
	});

	if (page) {
		page.timesOpened += 1;

		try {
			const dataToSave = page.save();
			res.status(200).json(dataToSave);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	} else {
		const page = new pageModel({
			name: req.body.name,
			timesOpened: 1,
		});

		try {
			const dataToSave = page.save();
			res.status(200).json(dataToSave);
		} catch (error) {
			res.status(400).json({ message: error.message });
		}
	}
});

//Connection Post Method
router.post('/connection', async (req, res) => {
	const connection = new connectionModel({
		cbAddress: req.body.cbAddress,
		user: req.body.user,
		date: req.body.date,
	});

	try {
		const dataToSave = connection.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}

	//check if user exists in user collection
	const user = await userModel.findOne({
		name: req.body.user,
	});

	if (!user) {
		const user = new userModel({
			name: req.body.user,
		});

		user.save();
	}
});

//Import Items Post Method
router.post('/itemImport', async (req, res) => {
	const itemImport = new itemImportModel({
		totalItems: req.body.totalItems,
		user: req.body.user,
		date: req.body.date,
	});

	try {
		const dataToSave = itemImport.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Get all Actions Method
router.get('/actions', async (req, res) => {
	try {
		const data = await actionModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Selected Projects Method
router.get('/projects', async (req, res) => {
	try {
		const data = await projectModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Selected Projects Method
router.get('/pages', async (req, res) => {
	try {
		const data = await pageModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Connections Method
router.get('/connections', async (req, res) => {
	try {
		const data = await connectionModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Users Method
router.get('/users', async (req, res) => {
	try {
		const data = await userModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Item Imports Method
router.get('/itemImports', async (req, res) => {
	try {
		const data = await itemImportModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
