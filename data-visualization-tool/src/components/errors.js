import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const baseURL = 'http://localhost:3001/api';

const config = {
	headers: {
		'x-api-key': '6mxzrsb2tt6j5qv0m2wu47xmqyh2mg',
	},
};

function Errors() {
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		//get data
		getErrors();
	}, []);

	async function getErrors() {
		const res = await axios(baseURL + '/errors', config);
		setErrors(res.data);
	}
	return (
		<div>
			<h2>Errors ({errors.length})</h2>
			<Table bordered responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Error Message</th>
						<th>Username</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{errors.map((_, index) => (
						<tr>
							<th>{index + 1}</th>
							<td key={index}>{errors[index].message}</td>
							<td key={index}>{errors[index].user}</td>
							<td key={index}>{errors[index].date}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Errors;
