import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
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
import AddEditServiceType from './AddEditServiceType';
import Tooltip from '@mui/material/Tooltip';

function CenterAdmin() {

	//common
	const [isUpdated, setIsUpdated] = useState(false);
	const [isEditVal, setIsEditVal] = useState(false);
	// roles
	const [roles, setRoleData] = useState([]);
	const [searchRole, setSearchRole] = useState("");
	const [selectedRole, setSelectedRole] = useState(null);
	const [addEditroleOpen, setAddEditRoleOpen] = useState(false);
	const [editRoleOpen, setEditRoleOpen] = useState(false);
	// service types
	const [serviceTypeData, setServiceTypeData] = useState([]);
	const [addEditServiceOpen, setAddEditServiceOpen] = useState(false);
	const [selectedServiceType, setSelectedServiceType] = useState(null);
	//Employee lits functions
	const [searchName, setSearchName] = useState("");
	const [searchdesignation, setSearchdesignation] = useState("");
	const [empData, setEmpData] = useState([]);
	const [editEmployeeOpen, setEditEmployeeOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);


	const empcolumns = [
		{ id: 'profile_pic', label: '', minWidth: 50, maxWidth: 50 },
		{ id: 'name', label: 'Name', minWidth: 170 },
		{ id: 'manager', label: 'Supervisor', minWidth: 230, format: (value) => setManagerValue(value) },
		{ id: 'designation', label: 'Designation', minWidth: 170 },
		{ id: 'roles', label: 'Role', minWidth: 100, format: (value) => setRoleName(value) },
		{ id: 'isActive', label: 'Status', minWidth: 80, maxWidth: 80 },
		{ id: 'actions', label: 'Actions', minWidth: 70, maxWidth: 70 }
	]

	const setManagerValue = (value) => {
		if (value?.manager_id) {
			return `${value.manager_name}, ${value.manager_designation}`;
		}
		return '';
	}

	const setRoleName = (value) => {
		const role = roles.find((role) => role.id === value.roles);
		return role?.name || '';
	}

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
				schema: window.sessionStorage.getItem('schema'),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setEmpData(data.data.empData);
			})
			.catch((error => { console.log(error) }));
	}, [isUpdated]);



	useEffect(() => {
		fetch("http://localhost:5000/center/settings/getroles", {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				schema: window.sessionStorage.getItem('schema'),
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setRoleData(data.data.roles);
			})
			.catch((error => { console.log(error) }));
	}, [isUpdated]);

	useEffect(() => {
		fetch(`http://localhost:5000/center/settings/serviceTypes`, {
			method: `POST`,
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				schema: window.sessionStorage.getItem('schema'),
			}),
		}).then((res) => res.json())
			.then((data) => {
				setServiceTypeData(data.data.serviceTypes);
			}).catch((error) => { console.log(error) });
	}, [isUpdated])

	const handleDeleteRole = (roleId) => {
		fetch(`http://localhost:5000/center/settings/roles/${roleId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				schema: window.sessionStorage.getItem('schema'),
			})
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
	};

	const handleEditRole = (role) => {
		setIsEditVal(true);
		setAddEditRoleOpen(true);
		setSelectedRole(role);
		setAddEditRoleOpen(true);
		setEditRoleOpen(true);
	}

	const handleEditemp = (row) => {
		setSelectedEmployee(row);
		setEditEmployeeOpen(true);
	}

	const handleEditService = (row) => {
		setSelectedServiceType(row);
		setAddEditServiceOpen(true);
		setIsEditVal(true);
	}

	const handleDeleteService = (id) => {
		fetch(`http://localhost:5000/center/settings/serviceTypes/${id}`, {
			method: `DELETE`,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				schema: window.sessionStorage.getItem('schema'),
			})
		}).then((res) => {
			if (res.ok) {
				setServiceTypeData((prevData) => prevData.filter((service) => service.id !== id));
			} else {
				console.error('Failed to delete service.');
			}
		}).catch((error) => {
			console.log(error);
		})
	}

	const handleStatusEpm = (emp) => {
		fetch(`http://localhost:5000/center/employee/${emp.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				schema: window.sessionStorage.getItem('schema'),
				isActive: !emp.isActive,
			}),
		})

			.then((res) => {
				if (res.ok) {
					console.log('Employee status updated successfully.');
					setIsUpdated(!isUpdated);
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
					<Card sx={{ width: '21vw', height: '40vh', marginRight: '20px', marginBottom: '20px' }}>
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
								<TableContainer component={Paper} sx={{ height: '30vh', width: '100%', }} >
									<Table stickyHeader size="small" aria-label="a dense table">
										<TableHead>
											<TableRow>
												{roleCols.map((column, index) => (
													<TableCell
														key={index}
														align={column.id === 'name' ? 'left' : 'center'}
														style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
													>
														{column.label}
													</TableCell>
												))}
											</TableRow>
										</TableHead>
										<TableBody >
											{filteredroleRows.map((row) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
														{roleCols.map((column, index) => {
															const value = row[column.id];
															return (
																column.id === 'name' ?
																	<TableCell key={index} align='left'>
																		{value}
																	</TableCell> :
																	<TableCell key={index} align='center'>
																		<div style={{ display: 'flex' }}>
																			{row.id !== 1 && <IconButton aira-label="edit" onClick={() => handleEditRole(row)} >
																				<Tooltip title="Edit"><EditOutlinedIcon></EditOutlinedIcon></Tooltip>
																			</IconButton>}
																			{row.id !== 1 && <IconButton aria-label="delete" onClick={() => handleDeleteRole(row.id)}>
																				<Tooltip title="Delete"><DeleteOutlinedIcon></DeleteOutlinedIcon></Tooltip>
																			</IconButton>}
																		</div>
																	</TableCell>
															)
														})}
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</CardContent>
					</Card>
					<Card sx={{ width: '21vw', height: '40vh', marginRight: '20px' }}>
						<CardContent>
							<Typography sx={{ fontSize: 20, position: 'relative' }} color="text.secondary" gutterBottom>
								<b>SERVICE TYPES</b>
								<Fab
									size="small"
									aria-label="add"
									style={{ backgroundColor: '#64b5f6', position: 'absolute', right: 0 }}
									onClick={() => setAddEditServiceOpen(true)}
								>
									<AddIcon />
								</Fab>
							</Typography>
							<div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
								<TableContainer component={Paper} style={{ maxHeight: '30vh' }}>
									<Table stickyHeader size="small" aria-label="a dense table">
										<TableHead>
											<TableRow>
												{serviceCols.map((col, indexc) => (
													<TableCell
														key={indexc}
														align={col.id !== 'actions' ? 'left' : 'center'}
														style={{ minWidth: col.minWidth, maxWidth: col.maxWidth }}
													>
														{col.label}
													</TableCell>
												))}
											</TableRow>
										</TableHead>
										<TableBody>
											{serviceTypeData.map((row) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
														{serviceCols.map((column) => {
															const value = row[column.id];
															return (
																column.id === 'actions' ? (
																	<TableCell key={column.id} align="center">
																		<div style={{ display: 'flex' }}>
																			<Tooltip title="Edit">
																				<IconButton aira-label="edit" onClick={() => handleEditService(row)} >
																					<EditOutlinedIcon />
																				</IconButton>
																			</Tooltip>
																			<Tooltip title="Delete">
																				<IconButton aria-label="delete" onClick={() => handleDeleteService(row.id)}>
																					<DeleteOutlinedIcon />
																				</IconButton>
																			</Tooltip>
																		</div>
																	</TableCell>
																) : (
																	<TableCell key={column.id} align="left">
																		{value}
																	</TableCell>
																)
															)
														})}
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						</CardContent>
					</Card>
				</div>


				{/* employee list */}
				<Card sx={{ width: '64vw', height: '82vh' }}>
					<CardContent>
						<Typography sx={{ fontSize: 20, }} color="text.secondary" >
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
							<div style={{ margin: '70px 0 5px 15px', width: '65vw', }}>
								<TableContainer component={Paper} sx={{ height: '67vh', minWidth: '30vw' }} style={{ boxShadow: 'none' }}>
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
											{filteredempRows.map((row, indexr) => {
												return (
													<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
														{empcolumns.map((column, indexc) => {
															const value = row[column.id];
															return (
																column.id !== 'isActive' ? (<TableCell key={column.id + '-' + indexr} align={column.align}>
																	{column.format?.(row) ?? value}
																</TableCell>
																) : (
																	<>
																		<TableCell key={indexc} align={column.align}>
																			<FormGroup>
																				<FormControlLabel disabled control={<Switch />} checked={value} label={value ? 'Active' : 'Inactive'} />
																			</FormGroup>
																		</TableCell>
																		<TableCell key={indexc} align={column.align}>
																			<div style={{ display: 'flex', justifyContent: 'left' }}>
																				<Grid item xs={1} >
																					<Tooltip title="Edit">
																						<IconButton aria-label="edit"
																							onClick={() => { handleEditemp(row) }}
																						>
																							<EditOutlinedIcon></EditOutlinedIcon>
																						</IconButton>
																					</Tooltip>
																				</Grid>
																				<Grid item xs={1} sx={{ marginLeft: 5 }}>
																					<IconButton aria-label="delete"
																						onClick={() => handleStatusEpm(row)}
																					>
																							{row['isActive'] ? <Tooltip title="Deactivate"><ToggleOffOutlinedIcon></ToggleOffOutlinedIcon></Tooltip> : <Tooltip title="Activate"><ToggleOnOutlinedIcon></ToggleOnOutlinedIcon></Tooltip>}
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
					empData={empData}
					closeEditEmployee={() => { setEditEmployeeOpen(false) }}
					isUpdatedEmp={() => { setIsUpdated(!isUpdated) }}
				/>

				<AddEditRole
					open={addEditroleOpen}
					openedit={editRoleOpen}
					roleData={selectedRole}
					isEdit={isEditVal}
					closeAddRole={() => { setAddEditRoleOpen(false); setSelectedRole(null) }}
					CloseEditRole={() => { setIsEditVal(false); setEditRoleOpen(false); setSelectedRole(null) }}
					isUpdatedRole={() => { setIsUpdated(!isUpdated) }}
				/>

				<AddEditServiceType
					open={addEditServiceOpen}
					serviceData={selectedServiceType}
					isEdit={isEditVal}
					closeEditServiceType={() => { setAddEditServiceOpen(false); setSelectedServiceType(null); setIsEditVal(false); }}
					isUpdatedService={() => { setIsUpdated(!isUpdated) }}
				/>


			</div>
		</div>
	)
}


export default CenterAdmin;