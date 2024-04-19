import React, { useState, useEffect } from 'react'
import './Employees.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Card,
  CardContent,
  Button
} from '@mui/material'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Headerfile from '../../Components/Page-Header/CardHeader';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CommonFunc from '../../Data/CommonFunc';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

const columns = [
  { id: 'profile_pic', label: '', minWidth: 50, maxWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'contact', label: 'Phone', minWidth: 170 },
  { id: 'nic', label: 'NIC', minWidth: 170 },
  { id: 'manager', label: 'Manager', minWidth: 400, format: (value) => value.manager_name.toString() + ', ' + value.manager_designation.toString() },
  { id: 'isActive', label: 'Status', minWidth: 80, maxWidth: 80 },  
  { id: 'actions', label: '', minWidth: 80, maxWidth: 80 }
]

const allowedRoles = new Set(['ep:ad', 's:ad']);

function Employees() {

  const [open, openchange] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchEmpNIC, setSearchEmpNIC] = useState('');
  const [empData, setEmpData] = useState([]);
  const [isNewEmp, setIsNewEmp] = useState(true);
  const [genderData, setGenderData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [editRole, setEditRole] = useState(false);
  const [emp, setEmp] = useState({
    username: '',
    password: '',
    name: '',
    contact: '',
    email: '',
    gender: '',
    dob: dayjs('2000-12-02'),
    profile_pic: null,
    nic: '',
    designation: '',
    manager_id: null,
    salary: '',
    isActive: true,
  });

  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleEmpNICChange = (event) => {
    setSearchEmpNIC(event.target.value);
  };

  const functionopenpopup = async () => {
    await getGenders();
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  const openPopupNewEmp = () => {
    setIsNewEmp(true);
    setEmp({
      username: '',
      password: '',
      name: '',
      contact: '',
      email: '',
      gender: '',
      dob: dayjs('2000-12-02'),
      profile_pic: null,
      nic: '',
      designation: '',
      manager_id: null,
      salary: '',
      isActive: true,
    });
    functionopenpopup();
  }

  const handleEmpDataChange = (event, property) => {
    setEmp(prevEmp => ({
      ...prevEmp,
      [property]: property === 'isActive' ? (emp.isActive ? false : true) : property === 'dob' ? event :event.target.value
    }));
  }

  const findDifferences = (obj1, obj2) => {
    const differences = {};
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        differences[key] = obj2[key];
      }
    }
    return differences;
  };

  const submitEmployee = async () => {
    const isValid = CommonFunc.validateEmployeeData(emp , isNewEmp);
    if (isValid.isValid) {
      try {
        if (isNewEmp) {
          const response = await fetch("http://localhost:5000/center/employee", {
            method: "POST",
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              schema: JSON.parse(window.sessionStorage.getItem('schema')),
              username: emp.username,
              password: emp.password,
              name: emp.name,
              email: emp.email,
              contact: emp.contact,
              gender: emp.gender,
              dob: emp.dob,
              nic: emp.nic,
              designation: emp.designation,
              manager_id: emp.manager_id,
              salary: emp.salary,
              isActive: emp.isActive,
            })
          });

          const data = await response.json();
          let arr = empData;
          arr.push(data.data.empData);
          setEmpData(arr);
          console.log('data: ', data, 'empData: ', empData);
        } else {
          // edit emp query
          const empObj = empData.filter((empd) => empd.id === emp.id)[0];
          let editedObj = findDifferences(empObj, emp);
          editedObj.schema = JSON.parse(window.sessionStorage.getItem('schema'));

          console.log("EditedObj : ", editedObj);
          const response = await fetch(`http://localhost:5000/center/employee/${emp.id}`, {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(editedObj),
          });
          const data = await response.json();
          console.log(data)
          const index = empData.findIndex((empD) => empD.id === emp.id );
          if (index !== -1) {
            // Create a copy of the current array
            const updatedEmpData = [...empData];
            // Remove the object at the found index
            updatedEmpData.splice(index, 1);
            // Add the new object at the same index
            updatedEmpData.splice(index, 0, data.data.empData);
            // Update the state with the new array
            setEmpData(updatedEmpData);
          }
        }
        
        closepopup();
      } catch (error) {
        console.log(error);
      }
    } else { 
      setShowAlert(true);
      setAlertMessage(isValid.message);
      setTimeout(() => {
        setShowAlert(false);
        setAlertMessage('');
      }, 3000); // Hides the alert after 3 seconds
    }
  };

  const getEmpData = () => { 
    return empData.filter((empD) => empD.id !== emp.id);
  }

  const editEmployeePopup = (empD) => {
    setIsNewEmp(false);
    setEmp(empD);
    setEmp((prevEmp) => ({
      ...prevEmp,
      dob: dayjs(prevEmp.dob)
    }));
    functionopenpopup();
  }

  const getGenders = async () => { 
    try {
      const response = await fetch("http://localhost:5000/parameter/gender", {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setGenderData(data.data.genders);
    } catch (error) { 
      console.log(error);
    }
  }

  const checkRoles = () => {
    const roles = (JSON.parse(window.sessionStorage.getItem('roles'))).split(", ");
    console.log(roles);
    setEditRole(allowedRoles.has(roles.find(role => role === 'ep:ad' || role === 's:ad')));
    console.log(" edit: ", editRole);
  };

  useEffect(() => {
    checkRoles();
    fetch("http://localhost:5000/center/getemployee", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        schema: JSON.parse(window.sessionStorage.getItem('schema')),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setEmpData(data.data.empData);
      })
      .catch((error => { console.log(error) }));
  }, []);

  let filteredEmployees = empData.filter((user) =>
    user.name.toLowerCase().includes(searchName.toLowerCase()) &&
    user.nic.toLowerCase().includes(searchEmpNIC.toLocaleLowerCase())
  );

  return (
    <div>
      <Headerfile title="Employees" />
      <Card sx={{ height: '80vh' }}>
        <CardContent>
          <div className='div' style={{ textAlign: "center", marginTop: 30 }}>
            <TextField sx={{ marginRight: 20, marginLeft: 5, width: 200 }} className='TextField1'
              id="standard-basic"
              variant="standard"
              label="Search by Employee Name"
              value={searchName}
              onChange={handleNameChange}
            />
            <TextField sx={{ marginRight: 20, marginLeft: 5, width: 200 }} className='TextField1'
              id="standard-basic"
              variant="standard"
              label="Search by Employee NIC"
              value={searchEmpNIC}
              onChange={handleEmpNICChange}
            />
            <Button variant="contained" onClick={openPopupNewEmp} color="primary" className='Button' sx={{ right: 0, left: 'auto' }} disabled={!editRole}>
              New Employee
            </Button>
            {/* Add employee popup  */}
            <Dialog
              fullScreen
              open={open}
              onClose={closepopup}
              fullWidth
              maxWidth="cl"
              style={{margin: '50px'}}
            >
              <DialogTitle>
                {isNewEmp ? "Add New Employee" : "Edit Employee"}
                <IconButton onClick={closepopup} style={{ float: "right" }}>
                  <CloseIcon color="primary"></CloseIcon>
                </IconButton>{" "}
                {showAlert && (
                  <Alert variant="filled" severity="error">
                    {alertMessage}
                  </Alert>
                )}
              </DialogTitle>
              <DialogContent style={{ margin: '40px' }}>
                <Grid container spacing={10} justifyContent="center">
                  <Grid item xs={12} sm={4}>
                    <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'username')} value={emp.username ?? ''} label="Username" disabled={!isNewEmp || !editRole} fullWidth variant="standard" />
                  </Grid>
                  {isNewEmp && <Grid item xs={12} sm={4}>
                    <TextField id="standard-basic" type="password" onChange={(event) => handleEmpDataChange(event, 'password')} value={emp.password ?? ''} label="Password" disabled={!isNewEmp || !editRole} fullWidth variant="standard" />
                  </Grid>}
                  <Grid item xs={12} sm={4}>
                    <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'name')} value={emp.name ?? ''} label="Name" fullWidth variant="standard" disabled={!editRole} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'contact')} value={emp.contact ?? ''} label="Contact" fullWidth variant="standard" disabled={!editRole} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'email')} value={emp.email ?? ''} label="Email" disabled={!isNewEmp || !editRole} fullWidth variant="standard" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={emp.gender ?? null}
                      fullWidth
                      onChange={(event) => handleEmpDataChange(event, 'gender')}
                      label="Gender"
                      variant="standard"
                      disabled={!editRole}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {genderData.map((item) => ( 
                        <MenuItem key={item.gender} value={item.gender}>
                          {item.description}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          label="Date of birth"
                          value={emp.dob}
                          variant="standard"
                          fullWidth
                          onChange={(newValue) => handleEmpDataChange(newValue, 'dob')}
                          disabled={!editRole}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'nic')} value={emp.nic ?? ''} label="NIC" disabled={!isNewEmp || !editRole} fullWidth variant="standard" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField id="standard-basic" onChange={(event) => handleEmpDataChange(event, 'designation')} value={emp.designation ?? ''} disabled={!editRole} label="Designation" fullWidth variant="standard" />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={Array.isArray(empData) ? getEmpData() : []}
                      getOptionLabel={(option) => option.name}
                      value={empData.find((option) => option.id === emp.manager_id) || null}
                      getoptionselected={(option, value) => option.manager_id === value.id}
                      onChange={(event, newValue) => {
                        setEmp({ ...emp, manager_id: newValue ? newValue.id : null }); // Save the selected manager_id
                      }}
                      disabled={!editRole}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Manager"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                        />
                      )}
                      renderOption={(props, option) => <li {...props}>{option.name}</li>}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      id="salary"
                      label="Salary"
                      type="number"
                      value={Number(emp.salary)} // Format the value to always show two decimal places
                      onChange={(e) => setEmp({ ...emp, salary: e.target.value })}
                      variant="standard"
                      fullWidth
                      disabled={!editRole}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch checked={emp.isActive} onChange={(event) => handleEmpDataChange(event, 'isActive')} disabled={!editRole} />}
                        label={emp.isActive ? 'Active' : 'Inactive'}
                      />
                    </FormGroup>
                  </Grid>
                  {
                    !isNewEmp && <Grid item xs={12} sm={4}>
                    </Grid>
                  }
                  <Grid item xs={12} sm={4}>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button fullWidth color="primary" variant="contained" disabled={!editRole} onClick={submitEmployee}>Submit</Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </div>
          <div style={{ overflowX: 'auto', position: 'relative' }}>
            <TableContainer component={Paper} sx={{ height: '65vh', minWidth: '1600px', marginTop: '1%' }} style={{ overflowX: 'auto' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
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
                  {filteredEmployees.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            column.id !== 'isActive' ? column.id === 'actions' ? <TableCell key={column.id} align={column.align} >
                              <IconButton aria-label="delete" onClick={() => editEmployeePopup(row)}>
                                <EditIcon />
                              </IconButton>
                            </TableCell> : ((<TableCell key={column.id} align={column.align}>
                              {column.format && row.manager_id !== null ? column.format(row) : value}
                            </TableCell>)) : (<TableCell key={column.id} align={column.align}>
                              <FormGroup>
                                <FormControlLabel disabled control={<Switch />} checked={value} label={value ? 'Active' : 'Inactive'} />
                              </FormGroup>
                            </TableCell>)
                          );
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
  )
}

export default Employees