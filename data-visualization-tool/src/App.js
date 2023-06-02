import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './App.css';

const baseURL = 'http://localhost:3001/api';

const config = {
	headers: {
		'x-api-key': '6mxzrsb2tt6j5qv0m2wu47xmqyh2mg',
	},
};

function App() {
	const [users, setUsers] = useState([]);
	const [connections, setConnections] = useState([]);
	const [itemImports, setItemImports] = useState([]);
	const [totalItemsImported, setTotalItemsImported] = useState(0);
	const [pages, setPages] = useState([]);
	const [projects, setProjects] = useState([]);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		//get data
		getUsers();
		getConnections();
		getItemImports();
		getPages();
		getProjects();
		getErrors();
	}, []);

	//api functions

	async function getUsers() {
		const res = await axios(baseURL + '/users', config);
		setUsers(res.data);
	}

	async function getConnections() {
		const res = await axios(baseURL + '/connections', config);
		setConnections(res.data);
	}

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

	async function getPages() {
		const res = await axios(baseURL + '/pages', config);
		setPages(res.data);
	}

	async function getProjects() {
		const res = await axios(baseURL + '/projects', config);
		setProjects(res.data);
	}

	async function getErrors() {
		const res = await axios(baseURL + '/errors', config);
		setErrors(res.data);
	}

	return (
		<div>
			<h2>Users ({users.length})</h2>
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
						<tr>
							<th>{index + 1}</th>
							<td key={index}>{users[index].name}</td>
							<td key={index}>{users[index].date}</td>
						</tr>
					))}
				</tbody>
			</Table>

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

			<h2>Projects ({projects.length})</h2>
			<Table bordered responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Project ID</th>
						<th>User</th>
						<th>Date</th>
						<th>Codebeamer Address</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((_, index) => (
						<tr>
							<th>{index + 1}</th>
							<td key={index}>{projects[index].projectLabel}</td>
							<td key={index}>{projects[index].projectId}</td>
							<td key={index}>{projects[index].user}</td>
							<td key={index}>{projects[index].date}</td>
							<td key={index}>{projects[index].cbAddress}</td>
						</tr>
					))}
				</tbody>
			</Table>

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

export default App;
