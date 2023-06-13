import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const baseURL = 'http://localhost:3001/api';

const config = {
	headers: {
		'x-api-key': '6mxzrsb2tt6j5qv0m2wu47xmqyh2mg',
	},
};

function Projects() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		//get data
		getProjects();
	}, []);

	async function getProjects() {
		const res = await axios.get(baseURL + '/projects', config);
		setProjects(res.data);
	}
	return (
		<div>
			<h2 data-testid="title">Projects ({projects.length})</h2>
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
						<tr key={index}>
							<th>{index + 1}</th>
							<td>{projects[index].projectLabel}</td>
							<td>{projects[index].projectId}</td>
							<td>{projects[index].user}</td>
							<td>{projects[index].date}</td>
							<td>{projects[index].cbAddress}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default Projects;
