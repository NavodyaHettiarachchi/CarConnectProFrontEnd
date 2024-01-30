import React, {useState} from 'react'
import './ViewClientel.css'
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
let USERS = [], STATUES = ['Active', 'Inactive'];
for(let i=0;i<14;i++){
    USERS[i] = {
        name: `User${i + 1}`,
        email: `user${i + 1}@example.com`,
        phone: `123-456-789${i}`,
        vehicleID:`V${i + 1}`,
        vehicleName: `Vehicle ${i + 1}`,
        joinDate: new Date().toLocaleDateString(),
        status: STATUES[Math.floor(Math.random() * STATUES.length)]
    }
}





function ViewClientel() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = useState('');
    const [searchVehicleID, setSearchVehicleID] = useState('');
  
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
    
    const handleVehicleIDChange = (event) => {
        setSearchVehicleID(event.target.value);
    };

    const filteredUsers = USERS.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase()) &&
        user.vehicleID.toLowerCase().includes(searchVehicleID.toLowerCase())
    );


  return (
    <div>
        <div className='div'>
            <TextField className='TextField'
                id="standard-basic"
                variant="standard" 
                label="Search by Name"
                value={searchName}
                onChange={handleNameChange}
            />
            <TextField className='TextField'
                id="standard-basic"
                variant="standard"
                label="Search by Vehicle ID"
                value={searchVehicleID}
                onChange={handleVehicleIDChange}
            />
            <Button variant="contained" color="primary" className='Button'>
                New Client
            </Button>
        </div>
           <TableContainer component={Paper} className='TableContainer'>
            <Table className='table' aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className='tableHeaderCell'>Client Info</TableCell>
                    <TableCell className='tableHeaderCell'>Vehicle Info</TableCell>
                    <TableCell className='tableHeaderCell'>Joining Date</TableCell>
                    <TableCell className='tableHeaderCell'>Status</TableCell>          
                </TableRow>
                </TableHead>
                <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.name}>
                    <TableCell>
                        <Grid container>
                            <Grid item lg={2}>
                                <Avatar alt={row.name} src='.' className='Avatar'/>
                            </Grid>
                            <Grid item lg={10}>    
                                <Typography className='name'>{row.name}</Typography>
                                <Typography color="textSecondary" variant='body2'>{row.email}</Typography>
                                <Typography color="textSecondary" variant='body2'>{row.phone}</Typography>
                            </Grid>    
                        </Grid>
                    </TableCell>
                    <TableCell>
                         <Typography color="primary" variant='subtitle2'>{row.vehicleID}</Typography>
                         <Typography color="textSecondary" variant='body2'>{row.vehicleName}</Typography>
                    </TableCell>
                    <TableCell>{row.joinDate}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 50, 100]}
                        component="div"
                        count={USERS.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Table>
        </TableContainer>
    </div>
    
  )
}

export default ViewClientel
