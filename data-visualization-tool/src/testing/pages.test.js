import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pages from '../components/pages';
import axios from 'axios';

const pages = [
	{
		name: 'test page',
		user: 'test user',
		date: new Date().toString(),
	},
	{
		name: 'test page',
		user: 'test user',
		date: new Date().toString(),
	},
];
const resp = { data: pages };

const mockAxiosGet = jest.spyOn(axios, 'get');

mockAxiosGet.mockResolvedValue(resp);

it('renders correctly', async () => {
	// render the component
	render(<Pages />);
});

it('contains the amount of pages in the title', async () => {
	// render the component
	render(<Pages />);

	// check if the pages length is in the title
	expect(await screen.findByTestId('title')).toHaveTextContent(
		`Pages (${pages.length})`
	);
});
