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
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter,
  TextField,
  Card,
  CardContent,
  Button
} from '@mui/material'
import Headerfile from '../../Components/Page-Header/CardHeader';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const columns = [
  { id: 'profile_pic', label: '', minWidth: 50, maxWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'contact', label: 'Phone', minWidth: 170 },
  { id: 'nic', label: 'NIC', minWidth: 170 },
  { id: 'manager', label: 'Manager', minWidth: 400, format: (value) => value.manager_name.toString() + ', ' + value.manager_designation.toString() },
  { id: 'isActive', label: 'Status', minWidth: 80, maxWidth: 80 }
]

function Employees() {

  const [searchName, setSearchName] = useState('');
  const [searchEmpNIC, setSearchEmpNIC] = useState('');
  const [empData, setEmpData] = useState([]);

  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleEmpNICChange = (event) => {
    setSearchEmpNIC(event.target.value);
  };

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
            <Button variant="contained" color="primary" className='Button' sx={{ right: 0, left: 'auto' }}>
              New Employee
            </Button>
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
                          console.log('Row : ', row);
                          return (
                            column.id !== 'isActive' ? (<TableCell key={column.id} align={column.align}>
                              {column.format && row.manager_id !== null ? column.format(row) : value}
                            </TableCell>) : <TableCell key={column.id} align={column.align}>
                              <FormGroup>
                                <FormControlLabel disabled control={<Switch />} checked={value} label={value ? 'Active' : 'Inactive'} />
                              </FormGroup>
                            </TableCell>
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