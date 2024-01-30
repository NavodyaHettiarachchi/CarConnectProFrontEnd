import React, { useState } from 'react'
import './Employees.css'
import {    Table,
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
    Button } from '@mui/material'


//sample data set
let EMPLOYEES = [];
for(let i=0;i<14;i++){
EMPLOYEES[i] = {
name: `Employee${i + 1}`,
email: `employee${i + 1}@example.com`,
phone: `123-456-789${i}`,
empID:`Emp${i + 1}`,
designation: `Mechanic ${i + 1}`,
joinDate: new Date().toLocaleDateString(),
}
}




function Employees() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);
    const [searchName, setSearchName] = useState('');
    const [searchEmpID, setSearchEmpID] = useState('');
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleNameChange = (event) => {
        setSearchName(event.target.value);
    };
    
    const handleEmpIDChange = (event) => {
        setSearchEmpID(event.target.value);
    };

    const filteredEmployees = EMPLOYEES.filter((user) =>
    user.name.toLowerCase().includes(searchName.toLowerCase()) &&
    user.empID.toLowerCase().includes(searchEmpID.toLowerCase())
    );

  return (
    <div>
       <div>
        <div className='div' style={{ textAlign: "center",marginTop:70 }}>
            <TextField className='TextField1'
                id="standard-basic"
                variant="standard" 
                label="Search by Employee Name"
                value={searchName}
                onChange={handleNameChange}
            />
            <TextField className='TextField1'
                id="standard-basic"
                variant="standard"
                label="Search by Employee ID"
                value={searchEmpID}
                onChange={handleEmpIDChange}
            />
            <Button variant="contained" color="primary" className='Button'>
                New Employee
            </Button>
        </div>
           <TableContainer component={Paper} className='TableContainer'>
            <Table className='table' aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className='tableHeaderCell' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Employee Name/Email/PhoneNo</TableCell>
                    <TableCell className='tableHeaderCell' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Employee Id/Designation</TableCell>
                    <TableCell className='tableHeaderCell' style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Joining Date</TableCell>         
                </TableRow>
                </TableHead>
                <TableBody>
                {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.name}>
                    <TableCell>
                        <Grid container>
                            <Grid item lg={2}>
                                <Avatar alt={row.name} src='.' className='Avatar'/>
                            </Grid>
                            <Grid item lg={10}>    
                                <Typography className='name'>{row.name}</Typography>
                                <Typography color="textSecondary" variant='body2' >{row.email}</Typography>
                                <Typography color="textSecondary" variant='body2'>{row.phone}</Typography>
                            </Grid>    
                        </Grid>
                    </TableCell>
                    <TableCell>
                         <Typography color="primary" variant='subtitle2'>{row.empID}</Typography>
                         <Typography color="textSecondary" variant='body2'>{row.designation}</Typography>
                    </TableCell>
                    <TableCell>{row.joinDate}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[6, 10, 50, 100]}
                        component="div"
                        count={EMPLOYEES.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    </div>
    </div>
  )
}

export default Employees
