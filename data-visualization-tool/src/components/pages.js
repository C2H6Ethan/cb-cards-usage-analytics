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

function Pages() {
	const [pages, setPages] = useState([]);

	useEffect(() => {
		//get data
		getPages();
	}, []);

	async function getPages() {
		const res = await axios(baseURL + '/pages', config);
		setPages(res.data);
	}
	return (
		<div>
			<h2>Pages ({pages.length})</h2>
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
						<tr>
							<th>{index + 1}</th>
							<td key={index}>{pages[index].name}</td>
							<td key={index}>{pages[index].user}</td>
							<td key={index}>{pages[index].date}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Pages;
