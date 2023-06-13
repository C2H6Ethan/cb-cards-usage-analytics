require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const apiKey = process.env.API_KEY;
const projectModel = require('../models/project');

describe('Post /api/project', () => {
	const payload = {
		cbAddress: 'https://retinatest.roche.com/cb',
		projectId: 123,
		projectLabel: 'test project',
		user: 'test user',
		date: new Date(),
	};

	afterEach(async () => {
		// Delete the entry in the database after each test
		await projectModel.findOneAndDelete({ user: 'test user' });
	});

	it('should return a 200 code', async () => {
		const res = await request(app)
			.post('/api/project')
			.send(payload)
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
	it('should add a new entry in the database', async () => {
		await request(app)
			.post('/api/project')
			.send(payload)
			.set('x-api-key', apiKey);

		const project = await projectModel.findOne({ user: 'test user' });
		expect(project).not.toBeNull();
	});
	it('should return a 400 code when wrong properties passed', async () => {
		const res = await request(app)
			.post('/api/project')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(400);
	});
});

describe('Get /api/projects', () => {
	it('should return a 200 code', async () => {
		const res = await request(app)
			.get('/api/projects')
			.set('x-api-key', apiKey);
		expect(res.statusCode).toBe(200);
	});
});
