import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const baseURL = 'http://localhost:3001/api';

const config = {
	headers: {
		'x-api-key': '6mxzrsb2tt6j5qv0m2wu47xmqyh2mg',
	},
};

function Connections() {
	const [connections, setConnections] = useState([]);

	useEffect(() => {
		//get data
		getConnections();
	}, []);

	async function getConnections() {
		const res = await axios.get(baseURL + '/connections', config);
		setConnections(res.data);
	}
	return (
		<div>
			<h2 data-testid="title">Connections ({connections.length})</h2>
			<Table bordered responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Codebeamer Address</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{connections.map((_, index) => (
						<tr key={index}>
							<th>{index + 1}</th>
							<td>{connections[index].user}</td>
							<td>{connections[index].cbAddress}</td>
							<td>{connections[index].date}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Connections;
