import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Projects from '../components/projects';
import axios from 'axios';

const projects = [
	{
		cbAddress: 'https://retinatest.roche.com/cb',
		projectId: 123,
		projectLabel: 'test project',
		user: 'test user',
		date: new Date().toString(),
	},
	{
		cbAddress: 'https://retinatest.roche.com/cb',
		projectId: 123,
		projectLabel: 'test project',
		user: 'test user',
		date: new Date().toString(),
	},
];
const resp = { data: projects };

const mockAxiosGet = jest.spyOn(axios, 'get');

mockAxiosGet.mockResolvedValue(resp);

it('renders correctly', async () => {
	// render the component
	render(<Projects />);
});

it('contains the amount of projects in the title', async () => {
	// render the component
	render(<Projects />);

	// check if the projects length is in the title
	expect(await screen.findByTestId('title')).toHaveTextContent(
		`Projects (${projects.length})`
	);
});
