import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../App.css';

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
		const res = await axios(baseURL + '/connections', config);
		setConnections(res.data);
	}
	return (
		<div>
			<h2>Connections ({connections.length})</h2>
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
						<tr>
							<th>{index + 1}</th>
							<td key={index}>{connections[index].user}</td>
							<td key={index}>{connections[index].cbAddress}</td>
							<td key={index}>{connections[index].date}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Connections;
