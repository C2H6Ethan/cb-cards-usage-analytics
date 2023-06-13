import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const baseURL = 'http://localhost:3001/api';

const config = {
	headers: {
		'x-api-key': '6mxzrsb2tt6j5qv0m2wu47xmqyh2mg',
	},
};

function Pages() {
	const [pages, setPages] = useState([]);

	useEffect(() => {
		//get data
		getPages();
	}, []);

	async function getPages() {
		const res = await axios.get(baseURL + '/pages', config);
		setPages(res.data);
	}
	return (
		<div>
			<h2 data-testid="title">Pages ({pages.length})</h2>
			<Table bordered responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>User</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{pages.map((_, index) => (
						<tr key={index}>
							<th>{index + 1}</th>
							<td>{pages[index].name}</td>
							<td>{pages[index].user}</td>
							<td>{pages[index].date}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Pages;
