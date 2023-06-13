import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Users from '../components/users';
import axios from 'axios';

const users = [
	{ name: 'test user', date: new Date().toString() },
	{ name: 'test user', date: new Date().toString() },
];
const resp = { data: users };

const mockAxiosGet = jest.spyOn(axios, 'get');

mockAxiosGet.mockResolvedValue(resp);

it('renders correctly', async () => {
	// render the component
	render(<Users />);
});

it('contains the amount of users in the title', async () => {
	// render the component
	render(<Users />);

	// check if the users length is in the title
	expect(await screen.findByTestId('title')).toHaveTextContent(
		`Users (${users.length})`
	);
});
