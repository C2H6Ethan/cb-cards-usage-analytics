const express = require('express');
const router = express.Router();
const projectModel = require('../models/project');
const pageModel = require('../models/page');
const connectionModel = require('../models/connection');
const userModel = require('../models/user');
const itemImportModel = require('../models/itemImport');
const errorModel = require('../models/error');
const apiAuth = require('../auth/apiAuth');

//Project loaded Post Method
router.post('/project', apiAuth, async (req, res) => {
	const project = new projectModel({
		cbAddress: req.body.cbAddress,
		projectId: req.body.projectId,
		projectLabel: req.body.projectLabel,
		user: req.body.user,
		date: req.body.date,
	});

	//Handling validation errors
	const givenParams = Object.keys(req.body);
	const allowedParams = [
		'cbAddress',
		'projectId',
		'projectLabel',
		'user',
		'date',
	];
	const validParams = givenParams.every((param) =>
		allowedParams.includes(param)
	);

	const reverseValidParams = allowedParams.every((param) =>
		givenParams.includes(param)
	);

	if (validParams && reverseValidParams) {
		project.save();
		res.status(200).json({ message: 'Project added successfully' });
	} else {
		res.status(400).json({ message: 'Wrong properties passed!' });
	}
});

//Page opened Post Method
router.post('/page', apiAuth, async (req, res) => {
	const page = new pageModel({
		name: req.body.name,
		user: req.body.user,
		date: req.body.date,
	});

	//Handling validation errors
	const givenParams = Object.keys(req.body);
	const allowedParams = ['name', 'user', 'date'];
	const validParams = givenParams.every((param) =>
		allowedParams.includes(param)
	);

	const reverseValidParams = allowedParams.every((param) =>
		givenParams.includes(param)
	);

	if (validParams && reverseValidParams) {
		page.save();
		res.status(200).json({ message: 'Page added successfully' });
	} else {
		res.status(400).json({ message: 'Wrong properties passed!' });
	}
});

//Connection Post Method
router.post('/connection', apiAuth, async (req, res) => {
	const connection = new connectionModel({
		cbAddress: req.body.cbAddress,
		user: req.body.user,
		date: req.body.date,
	});

	//Handling validation errors
	const givenParams = Object.keys(req.body);
	const allowedParams = ['cbAddress', 'user', 'date'];
	const validParams = givenParams.every((param) =>
		allowedParams.includes(param)
	);

	const reverseValidParams = allowedParams.every((param) =>
		givenParams.includes(param)
	);

	if (validParams && reverseValidParams) {
		connection.save();

		//check if user exists in user collection
		const user = await userModel.findOne({
			name: req.body.user,
		});

		if (!user) {
			const user = new userModel({
				name: req.body.user,
				date: new Date(),
			});

			user.save();
		}

		res.status(200).json({ message: 'Connection added successfully' });
	} else {
		res.status(400).json({ message: 'Wrong properties passed!' });
	}
});

//Import Items Post Method
router.post('/itemImport', apiAuth, async (req, res) => {
	const itemImport = new itemImportModel({
		items: req.body.items,
		totalItems: req.body.totalItems,
		user: req.body.user,
		date: req.body.date,
	});

	//Handling validation errors
	const givenParams = Object.keys(req.body);
	const allowedParams = ['items', 'totalItems', 'user', 'date'];
	const validParams = givenParams.every((param) =>
		allowedParams.includes(param)
	);

	const reverseValidParams = allowedParams.every((param) =>
		givenParams.includes(param)
	);

	if (validParams && reverseValidParams) {
		itemImport.save();
		res.status(200).json({ message: 'ItemImport added successfully' });
	} else {
		res.status(400).json({ message: 'Wrong properties passed!' });
	}
});

//Error Post Method
router.post('/error', apiAuth, async (req, res) => {
	const error = new errorModel({
		message: req.body.message,
		user: req.body.user,
		date: req.body.date,
	});

	//Handling validation errors
	const givenParams = Object.keys(req.body);
	const allowedParams = ['message', 'user', 'date'];
	const validParams = givenParams.every((param) =>
		allowedParams.includes(param)
	);

	const reverseValidParams = allowedParams.every((param) =>
		givenParams.includes(param)
	);

	if (validParams && reverseValidParams) {
		error.save();
		res.status(200).json({ message: 'Error added successfully' });
	} else {
		res.status(400).json({ message: 'Wrong properties passed!' });
	}
});

//Get all Selected Projects Method
router.get('/projects', apiAuth, async (req, res) => {
	try {
		const data = await projectModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Selected Projects Method
router.get('/pages', apiAuth, async (req, res) => {
	try {
		const data = await pageModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Connections Method
router.get('/connections', apiAuth, async (req, res) => {
	try {
		const data = await connectionModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Users Method
router.get('/users', apiAuth, async (req, res) => {
	try {
		const data = await userModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Item Imports Method
router.get('/itemImports', apiAuth, async (req, res) => {
	try {
		const data = await itemImportModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get all Errors Method
router.get('/errors', apiAuth, async (req, res) => {
	try {
		const data = await errorModel.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Delete Project Method
router.delete('/project/:id', apiAuth, async (req, res) => {
	try {
		const id = req.params.id;
		const deletedProject = await projectModel.findOneAndDelete({ _id: id });

		if (!deletedProject) {
			return res.status(404).json({ message: 'Project not found' });
		}

		return res
			.status(200)
			.json({ message: 'Project deleted successfully' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

module.exports = router;
