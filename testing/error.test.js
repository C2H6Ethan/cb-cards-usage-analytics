require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const apiKey = process.env.API_KEY;
const errorModel = require('../models/error');

describe('Post /api/error', () => {
	const payload = {
		message: 'test message',
		user: 'test user',
		date: new Date(),
	};

	afterEach(async () => {
		// Delete the entry in the database after each test
		await errorModel.findOneAndDelete({ user: 'test user' });
	});

	it('should return a 200 code', async () => {
		const res = await request(app)
			.post('/api/error')
			.send(payload)
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
	it('should add a new entry in the database', async () => {
		await request(app)
			.post('/api/error')
			.send(payload)
			.set('x-api-key', apiKey);

		const error = await errorModel.findOne({ user: 'test user' });
		expect(error).not.toBeNull();
	});
	it('should return a 400 code when wrong properties passed', async () => {
		const res = await request(app)
			.post('/api/error')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(400);
	});
});

describe('Get /api/errors', () => {
	it('should return a 200 code', async () => {
		const res = await request(app)
			.get('/api/errors')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
});
