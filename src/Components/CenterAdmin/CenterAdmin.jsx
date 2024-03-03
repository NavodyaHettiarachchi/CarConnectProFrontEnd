import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import EditEmployee from './EditEmployee';
import AddEditRole from './AddEditRole';


const empcolumns = [
	{ id: 'profile_pic', label: '', minWidth: 50, maxWidth: 50 },
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'manager', label: 'Supervisor', minWidth: 230, format: (value) => value.manager_name.toString() + ', ' + value.manager_designation.toString() },
	{ id: 'designation', label: 'Designation', minWidth: 170 },
	{ id: 'roles', label: 'Role', minWidth: 100 },
	{ id: 'isActive', label: 'Status', minWidth: 80, maxWidth: 80 },
	{ id: 'actions', label: 'Actions', minWidth: 70, maxWidth: 70 }
]

function CenterAdmin() {

	//filers methods
	const [empData, setEmpData] = useState([]);
	const [roles, setRoleData] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [searchdesignation, setSearchdesignation] = useState("");
	const [searchRole, setSearchRole] = useState("");
	const [selectedRole, setSelectedRole] = useState(null);

	let filteredempRows = empData ? empData.filter((user) =>
		user.name.toLowerCase().includes(searchName.toLowerCase()) &&
		user.designation.toLowerCase().includes(searchdesignation.toLowerCase())
	) : [];

	let filteredroleRows = roles ? roles.filter((user) =>
		user.name.toLowerCase().includes(searchRole.toLowerCase())
	) : [];


	const roleCols = [
		{ id: 'name', label: 'Role', minWidth: 200, maxWidth: 200 },
		{ id: 'actions', label: 'Actions', minWidth: 70, maxWidth: 70 }
	]

	const serviceCols = [
		{ id: 'name', label: 'Service', minWidth: 130, maxWidth: 130 },
		{ id: 'cost', label: 'Cost', minWidth: 100, maxWidth: 100 },
		{ id: 'actions', label: 'Actions', minWidth: 70, maxWidth: 70 }
	]

	useEffect(() => {
		fetch("http://localhost:5000/center/getemployee", {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				schema: 'service_pqr_service_center',
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setEmpData(data.data.empData);
			})
			.catch((error => { console.log(error) }));
	}, []);



	useEffect(() => {
		fetch("http://localhost:5000/center/settings/getroles", {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				schema: 'service_pqr_service_center',
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setRoleData(data.data.roles);
			})
			.catch((error => { console.log(error) }));
	}, []);


	const handleDeleteRole = (roleId) => {

		// const schema = 'service_pqr_service_center';

		fetch(`http://localhost:5000/center/settings/roles/${roleId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			// body: JSON.stringify({
			//   schema: schema,
			// }),
		})

			.then((res) => {
				if (res.ok) {
					setRoleData((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
					console.log('Role deleted successfully.');
				} else {
					console.error('Failed to delete role.');
				}
			})
			.catch((error) => {
				console.error('Error deleting a role: ', error);
			})
	}


	//Employee lits functions
	//   const [employeeToEdit, setEmployeeToEdit] = useState(null);
	const [editEmployeeOpen, setEditEmployeeOpen] = useState(false);
	const [addEditroleOpen, setAddEditRoleOpen] = useState(false);
	const [editRoleOpen, setEditRoleOpen] = useState(false);


	const handleEditRole = (role) => {
		setAddEditRoleOpen(true);
		setSelectedRole(role);
		setAddEditRoleOpen(true);
		setEditRoleOpen(true);
	}


	const [selectedEmployee, setSelectedEmployee] = useState(null);


	const handleEditemp = (row) => {

		setSelectedEmployee(row);
		setEditEmployeeOpen(true);
	}

	const handleStatusEpm = (empId) => {
		fetch(`http://localhost:5000/center/employee/${empId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				schema: 'service_pqr_service_center',
				isActive: false
			}),
		})

			.then((res) => {
				if (res.ok) {
					console.log('Employee status updated successfully.');
				} else {
					console.error('Failed to update employee status.');
				}
			})
			.catch((error) => {
				console.error('Error updating employee status: ', error);
			})
	}




	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '50px' }}>
				<div>
					<Card sx={{ minWidth: '21vw', minHeight: '40vh', marginRight: '20px', marginBottom: '20px' }}>
						<CardContent>
							<Typography sx={{ fontSize: 20, position: 'relative' }} color="text.secondary" gutterBottom>
								<b>ROLES</b>
								<TextField sx={{ marginLeft: 5 }}
									className="TextField"
									id="standard-basic"
									variant="standard"
									label="Search by Name"
									value={searchRole}
									onChange={(e) => setSearchRole(e.target.value)}
								/>
								<Fab size="small"
									aria-label="add"
									style={{ backgroundColor: '#64b5f6', position: 'absolute', right: 0 }}
									onClick={() => setAddEditRoleOpen(true)}
								>
									<AddIcon />
								</Fab>
							</Typography>
							<div style={{ overflowX: 'auto' }}>
								<TableContainer component={Paper} sx={{ height: '100%', width: '100%', }} style={{ overflowX: 'auto' }}>
									<Table stickyHeader size="small" aria-label="a dense table">
										<TableHead>
											<TableRow>
												{roleCols.map((column) => (
													<TableCell
														key={column.id}
														align={column.id === 'name' ? 'left' : 'center'}
														style={{ minWidth: column.minWidth,  maxWidth: column.maxWidth }}
													>
														{ column.label }
													</TableCell>
												)) }
											</TableRow>
										</TableHead>
										<TableBody>
											{filteredroleRows.map((row) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
														{roleCols.map((column) => {
															const value = row[column.id];
															return (
																column.id === 'name' ?
																	<TableCell key={column.id} align='left'>
																		{ value }
																	</TableCell> :
																	<TableCell key={column.id} align='center'>
																		<div style={{ display: 'flex' }}>
																			{row.id !== 1 && <IconButton aira-label="edit" onClick={() => handleEditRole(row)} >
																				<EditOutlinedIcon></EditOutlinedIcon>
																			</IconButton>}
																			{ row.id !== 1 && <IconButton aria-label="delete" onClick={() => handleDeleteRole(row.id)}>
																				<DeleteOutlinedIcon></DeleteOutlinedIcon>
																			</IconButton>}
																		</div>
																	</TableCell>
															)
														}) }
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</CardContent>
					</Card>

					<Card sx={{ minWidth: '21vw', minHeight: '40vh', marginRight: '20px' }}>
						<CardContent>
							<Typography sx={{ fontSize: 20, position: 'relative' }} color="text.secondary" gutterBottom>
								<b>SERVICE TYPES</b>
								<Fab size="small"
									aria-label="add"
									style={{ backgroundColor: '#64b5f6', position: 'absolute', right: 0 }}  >
									<AddIcon />
								</Fab>
							</Typography>
							<div style={{ overflowX: 'auto', position: 'relative' }}>
								<TableContainer component={Paper} sx={{ height: '100%', width: '100%', overflowX: 'auto'}}>
									<Table stickyHeader>
										<TableHead>
											<TableRow>
												{serviceCols.map((col) => (
													<TableCell
														key={col.id}
														align={col.id !== 'actions' ? 'left' : 'center'}
														style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
													>
														{col.label}
													</TableCell>
												))}
											</TableRow>
										</TableHead>
									</Table>
								</TableContainer>
							</div>
						</CardContent>
					</Card>
				</div>


				{/* employee list */}
				<Card sx={{ width: '64vw', height: '82vh' }}>
					<CardContent>
						<Typography sx={{ fontSize: 20, }} color="text.secondary" gutterBottom>
							<b>EMPLOYEES</b>
							<b>
								<TextField sx={{ marginLeft: 10 }}
									className="TextField"
									id="standard-basic"
									variant="standard"
									label="Search by Name"
									value={searchName}
									onChange={(e) => setSearchName(e.target.value)}
								/>
								<TextField sx={{ marginLeft: 5 }}
									className="TextField"
									id="standard-basic"
									variant="standard"
									label="Search by Designation"
									value={searchdesignation}
									onChange={(e) => setSearchdesignation(e.target.value)}
								/>
							</b>
						</Typography>

						<Grid container spacing={2}>
							{/* employee table */}
							<div style={{ margin: '70px 0 5px 15px', width: '65vw' }}>
								<TableContainer component={Paper} sx={{ height: '66vh', minWidth: '30vw', marginTop: '1%' }} style={{ overflowX: 'auto' }}>
									<Table stickyHeader size="small" aria-label="a dense table">
										<TableHead>
											<TableRow>
												{empcolumns.map((column) => (
													<TableCell
														key={column.id}
														align={column.align}
														style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
													>
														{column.label}
													</TableCell>
												))}
											</TableRow>
										</TableHead>
										<TableBody>
											{filteredempRows.map((row) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
														{empcolumns.map((column) => {
															const value = row[column.id];
															return (
																column.id !== 'isActive' ? (<TableCell key={row.id} align={column.align}>
																	{column.format && row.manager_id !== null ? column.format(row) : value}
																</TableCell>
																) : (
																	<>
																		<TableCell key={column.id} align={column.align}>
																			<FormGroup>
																				<FormControlLabel disabled control={<Switch />} checked={value} label={value ? 'Active' : 'Inactive'} />
																			</FormGroup>
																		</TableCell>
																		<TableCell key={column.id} align={column.align}>
																			<div style={{ display: 'flex', justifyContent: 'center' }}>
																				<Grid item xs={1} >
																					<IconButton aria-label="edit"
																						onClick={() => { handleEditemp(row) }} 
																					>
																						<EditOutlinedIcon></EditOutlinedIcon>
																					</IconButton>
																				</Grid>
																				<Grid item xs={1} sx={{ marginLeft: 5 }}>
																					<IconButton aria-label="delete"
																						onClick={() => handleStatusEpm(row.id)}
																					>
																						<DeleteOutlinedIcon></DeleteOutlinedIcon>
																					</IconButton>
																				</Grid>
																			</div>
																		</TableCell>
																	</>
																));
														})}
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</Grid>
					</CardContent>
				</Card>

				{/* Edit popup */}
				<EditEmployee
					open={editEmployeeOpen}
					employeeToEdit={selectedEmployee}
					closeEditEmployee={() => { setEditEmployeeOpen(false) }}
				/>

				<AddEditRole
					open={addEditroleOpen}
					openedit={editRoleOpen}
					roleData={selectedRole}
					closeAddRole={() => { setAddEditRoleOpen(false) }}
					CloseEditRole={() => { setEditRoleOpen(false) }}
				/>


			</div>
		</div>
	)
}


export default CenterAdmin;