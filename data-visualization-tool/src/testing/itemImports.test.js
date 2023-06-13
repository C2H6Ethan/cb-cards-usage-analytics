import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemImports from '../components/itemImports';
import axios from 'axios';

const itemImports = [
	{
		items: ['test item 1', 'test item 2'],
		totalItems: 2,
		user: 'test user',
		date: new Date().toString(),
	},
	{
		items: ['test item 1', 'test item 2'],
		totalItems: 2,
		user: 'test user',
		date: new Date().toString(),
	},
];
const resp = { data: itemImports };

const mockAxiosGet = jest.spyOn(axios, 'get');

mockAxiosGet.mockResolvedValue(resp);

it('renders correctly', async () => {
	// render the component
	render(<ItemImports />);
});

it('contains the total amount of item imports in the title', async () => {
	// render the component
	render(<ItemImports />);

	// calculate the total amount of item imports
	let totalItemsImported = 0;
	itemImports.forEach((itemImport) => {
		totalItemsImported += itemImport.totalItems;
	});

	// check if the total amount of item imports length is in the title
	expect(await screen.findByTestId('title')).toHaveTextContent(
		`Items Imported (${totalItemsImported})`
	);
});
