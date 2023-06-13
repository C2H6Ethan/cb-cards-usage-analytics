require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const apiKey = process.env.API_KEY;
const itemImportModel = require('../models/itemImport');

describe('Post /api/itemImport', () => {
	const payload = {
		items: ['test item 1', 'test item 2'],
		totalItems: 2,
		user: 'test user',
		date: new Date(),
	};

	afterEach(async () => {
		// Delete the entry in the database after each test
		await itemImportModel.findOneAndDelete({ user: 'test user' });
	});

	it('should return a 200 code', async () => {
		const res = await request(app)
			.post('/api/itemImport')
			.send(payload)
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
	it('should add a new entry in the database', async () => {
		await request(app)
			.post('/api/itemImport')
			.send(payload)
			.set('x-api-key', apiKey);

		const itemImport = await itemImportModel.findOne({ user: 'test user' });
		expect(itemImport).not.toBeNull();
	});
	it('should return a 400 code when wrong properties passed', async () => {
		const res = await request(app)
			.post('/api/itemImport')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(400);
	});
});

describe('Get /api/itemImports', () => {
	it('should return a 200 code', async () => {
		const res = await request(app)
			.get('/api/itemImports')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
});
