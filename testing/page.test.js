require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const apiKey = process.env.API_KEY;
const pageModel = require('../models/page');

describe('Post /api/page', () => {
	const payload = {
		name: 'test page',
		user: 'test user',
		date: new Date(),
	};

	afterEach(async () => {
		// Delete the entry in the database after each test
		await pageModel.findOneAndDelete({ user: 'test user' });
	});

	it('should return a 200 code', async () => {
		const res = await request(app)
			.post('/api/page')
			.send(payload)
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
	it('should add a new entry in the database', async () => {
		await request(app)
			.post('/api/page')
			.send(payload)
			.set('x-api-key', apiKey);

		const page = await pageModel.findOne({ user: 'test user' });
		expect(page).not.toBeNull();
	});
	it('should return a 400 code when wrong properties passed', async () => {
		const res = await request(app)
			.post('/api/page')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(400);
	});
});

describe('Get /api/pages', () => {
	it('should return a 200 code', async () => {
		const res = await request(app)
			.get('/api/pages')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
});
