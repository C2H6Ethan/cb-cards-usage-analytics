require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const apiKey = process.env.API_KEY;

describe('GET /api/users without an Authentication key', () => {
	it('should return a 403 code ', async () => {
		const res = await request(app).get('/api/users');
		expect(res.statusCode).toBe(403);
	});
});

describe('GET /api/users with a valid Authentication key', () => {
	it('should return a 200 code ', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
});
