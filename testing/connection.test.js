require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const apiKey = process.env.API_KEY;
const connectionModel = require('../models/connection');
const userModel = require('../models/user');

describe('Post /api/connection', () => {
	const payload = {
		cbAddress: 'https://retinatest.roche.com/cb',
		user: 'test user',
		date: new Date(),
	};

	afterEach(async () => {
		// Delete the entries in the database after each test
		await connectionModel.findOneAndDelete({ user: 'test user' });
		await userModel.findOneAndDelete({ name: 'test user' });
	});

	it('should return a 200 code', async () => {
		const res = await request(app)
			.post('/api/connection')
			.send(payload)
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
	it('should add a new entry in the database', async () => {
		await request(app)
			.post('/api/connection')
			.send(payload)
			.set('x-api-key', apiKey);

		const connection = await connectionModel.findOne({ user: 'test user' });
		expect(connection).not.toBeNull();
	});
	it('should add a new user entry in the database', async () => {
		await request(app)
			.post('/api/connection')
			.send(payload)
			.set('x-api-key', apiKey);

		const user = await userModel.findOne({ name: 'test user' });
		expect(user).not.toBeNull();
	});
	it('should return a 400 code when wrong properties passed', async () => {
		const res = await request(app)
			.post('/api/connection')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(400);
	});
});

describe('Get /api/connections', () => {
	it('should return a 200 code', async () => {
		const res = await request(app)
			.get('/api/connections')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
});
