import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Connections from '../components/connections';
import axios from 'axios';

const connections = [
	{
		user: 'test user',
		cbAddress: 'https://retinatest.roche.com/cb',
		date: new Date().toString(),
	},
	{
		user: 'test user',
		cbAddress: 'https://retinatest.roche.com/cb',
		date: new Date().toString(),
	},
];
const resp = { data: connections };

const mockAxiosGet = jest.spyOn(axios, 'get');

mockAxiosGet.mockResolvedValue(resp);

it('renders correctly', async () => {
	// render the component
	render(<Connections />);
});

it('contains the amount of connections in the title', async () => {
	// render the component
	render(<Connections />);

	// check if the connections length is in the title
	expect(await screen.findByTestId('title')).toHaveTextContent(
		`Connections (${connections.length})`
	);
});
