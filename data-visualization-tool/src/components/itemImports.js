import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const baseURL = 'http://localhost:3001/api';

const config = {
	headers: {
		'x-api-key': '6mxzrsb2tt6j5qv0m2wu47xmqyh2mg',
	},
};

function ItemImports() {
	const [itemImports, setItemImports] = useState([]);
	const [totalItemsImported, setTotalItemsImported] = useState(0);

	useEffect(() => {
		//get data
		getItemImports();
	}, []);

	async function getItemImports() {
		let totalItemsImported = 0;
		const res = await axios(baseURL + '/itemImports', config);
		const data = res.data;
		data.forEach((itemImport) => {
			totalItemsImported += itemImport.totalItems;
		});
		setItemImports(res.data);
		setTotalItemsImported(totalItemsImported);
	}
	return (
		<div>
			<h2>Items Imported ({totalItemsImported})</h2>
			<Table bordered responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Amount of Items Imported</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{itemImports.map((_, index) => (
						<tr>
							<th>{index + 1}</th>
							<td key={index}>{itemImports[index].user}</td>
							<td key={index}>{itemImports[index].totalItems}</td>
							<td key={index}>{itemImports[index].date}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default ItemImports;
