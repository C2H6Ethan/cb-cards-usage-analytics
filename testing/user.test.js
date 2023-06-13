require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const apiKey = process.env.API_KEY;

describe('Get /api/users', () => {
	it('should return a 200 code', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
});
