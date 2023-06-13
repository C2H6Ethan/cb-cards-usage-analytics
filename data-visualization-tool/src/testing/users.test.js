import { create, act } from 'react-test-renderer';
import Users from '../components/users';
import axios from 'axios';

const users = [
	{ name: 'test user', date: new Date().toString() },
	{ name: 'test user 2', date: new Date().toString() },
];
const resp = { data: users };

const mockAxiosGet = jest.spyOn(axios, 'get');

mockAxiosGet.mockResolvedValue(resp);

it('renders correctly', async () => {
	// render the component
	act(() => {
		create(<Users />);
	});
});
