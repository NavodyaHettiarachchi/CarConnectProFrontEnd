import React, { useState } from "react";
import "./ViewClientel.css";
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
          Button,
        } from "@mui/material";
import {
          Checkbox,
          Dialog,
          DialogActions,
          DialogContent,
          DialogContentText,
          DialogTitle,
          FormControlLabel,
          IconButton,
          Stack,
          RadioGroup,
          Radio,
          FormLabel,
          FormControl,
        } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//sample data set
let USERS = [],
  STATUES = ["Active", "Inactive"];
for (let i = 0; i < 14; i++) {
  USERS[i] = {
    name: `User${i + 1}`,
    nic: `99344037${i + 1}`,
    address: `no${i + 1},road${i + 1}, city${i + 1} `,
    email: `user${i + 1}@example.com`,
    phone: `123-456-789${i}`,
    vehicleID: `V${i + 1}`,
    vehicleName: `Vehicle ${i + 1}`,
    joinDate: new Date().toLocaleDateString(),
    status: STATUES[Math.floor(Math.random() * STATUES.length)],
  };
}

function ViewClientel() {
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [searchName, setSearchName] = useState("");
  const [searchVehicleID, setSearchVehicleID] = useState("");

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

  const filteredUsers = USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase()) &&
      user.vehicleID.toLowerCase().includes(searchVehicleID.toLowerCase())
  );

  return (
    <div>
      <div className="div" style={{ textAlign: "center",marginTop:70 }}>
        <TextField sx={{marginLeft:10}}
          className="TextField"
          id="standard-basic"
          variant="standard"
          label="Search by Name"
          value={searchName}
          onChange={handleNameChange}
        />
        <TextField sx={{marginLeft:5}}
          className="TextField"
          id="standard-basic"
          variant="standard"
          label="Search by Vehicle ID"
          value={searchVehicleID}
          onChange={handleVehicleIDChange}
        />
        <Button sx={{marginLeft:5}}
          variant="contained"
          color="primary"
          className="Button"
          onClick={functionopenpopup}
        >
          New Client
        </Button>
        <Dialog
          // fullScreen
          open={open}
          onClose={closepopup}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            ADD CLIENT{" "}
            <IconButton onClick={closepopup} style={{ float: "right" }}>
              <CloseIcon color="primary"></CloseIcon>
            </IconButton>{" "}
          </DialogTitle>
          <DialogContent>
            {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
            <Stack spacing={2} margin={2}>
              <TextField variant="outlined" label="NIC"></TextField>
              <TextField variant="outlined" label="Nick Name"></TextField>
              <TextField variant="outlined" label="Full Name"></TextField>
              <TextField variant="outlined" label="Address Line 1"></TextField>
              <TextField variant="outlined" label="Address Line 2"></TextField>
              <TextField variant="outlined" label="City"></TextField>
              <TextField variant="outlined" label="Email"></TextField>
              <TextField variant="outlined" label="Phone"></TextField>

              <FormControl>
                <FormLabel id="gender">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="gender"
                  defaultValue="male"
                  name="gender"
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>

              <FormControlLabel
                control={<Checkbox defaultChecked color="primary"></Checkbox>}
                label="Agree terms & conditions"
              ></FormControlLabel>
              <Button color="primary" variant="contained">
                Submit
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
          </DialogActions>
        </Dialog>
      </div>
      <TableContainer component={Paper} className="TableContainer">
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHeaderCell" style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Client Info</TableCell>
              <TableCell className="tableHeaderCell" style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Vehicle Info</TableCell>
              <TableCell className="tableHeaderCell" style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Joining Date</TableCell>
              <TableCell className="tableHeaderCell" style={{ backgroundColor: '#2222', fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <Grid container>
                      <Grid item lg={2}>
                        <Avatar style={{ backgroundColor: '#6756d6'}} alt={row.name} src="." className="Avatar" />
                      </Grid>
                      <Grid item lg={10}>
                        <Typography className="name">{row.name}</Typography>
                        <Typography color="textSecondary" variant="body2">
                          {row.nic}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {row.address}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {row.email}
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                          {row.phone}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Typography color="primary" variant="subtitle2">
                      {row.vehicleID}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.vehicleName}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.joinDate}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[6, 10, 50, 100]}
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
  );
}

export default ViewClientel;