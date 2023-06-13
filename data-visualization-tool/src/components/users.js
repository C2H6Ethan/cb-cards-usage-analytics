import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const baseURL = 'http://localhost:3001/api';

const config = {
	headers: {
		'x-api-key': '6mxzrsb2tt6j5qv0m2wu47xmqyh2mg',
	},
};

function Users() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		//get data
		getUsers();
	}, []);

	async function getUsers() {
		const res = await axios.get(baseURL + '/users', config);
		setUsers(res.data);
	}
	return (
		<div>
			<h2 data-testid="usersTitle">Users ({users.length})</h2>
			<Table bordered responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{users.map((_, index) => (
						<tr key={index}>
							<th>{index + 1}</th>
							<td>{users[index].name}</td>
							<td>{users[index].date}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Users;
