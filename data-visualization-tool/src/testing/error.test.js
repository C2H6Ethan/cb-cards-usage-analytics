import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Errors from '../components/errors';
import axios from 'axios';

const errors = [
	{
		message: 'test message ',
		user: 'test user',
		date: new Date().toString(),
	},
	{
		message: 'test message ',
		user: 'test user',
		date: new Date().toString(),
	},
];
const resp = { data: errors };

const mockAxiosGet = jest.spyOn(axios, 'get');

mockAxiosGet.mockResolvedValue(resp);

it('renders correctly', async () => {
	// render the component
	render(<Errors />);
});

it('contains the amount of errors in the title', async () => {
	// render the component
	render(<Errors />);

	// check if the errors length is in the title
	expect(await screen.findByTestId('title')).toHaveTextContent(
		`Errors (${errors.length})`
	);
});
