import React, { useEffect, useState } from "react";
import "./ViewClientel.css";
import { Card, CardContent } from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from 'dayjs';
import 'dayjs/locale/de';
import 'dayjs/locale/en-gb';
import Autocomplete from '@mui/material/Autocomplete';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Headerfile from '../../Components/Page-Header/CardHeader';

const allowedRoles = new Set(['cp:ad', 's:ad']);

const columns = [
  {
    id: 'number_plate', label: 'Number Plate', minWidth: 225
  },
  { id: 'client_reg_date', label: 'Date of Registration', minWidth: 225, format: (value) => value.client_reg_date.split('T')[0] },
  { id: 'mileage_on_reg', label: 'Mileage at Registration', minWidth: 225, align: 'center' },
  { id: 'owner', label: 'Owner', minWidth: 350, format: (value) => value.owner_name + ', ' + value.owner_contact }
]

function ViewClientel() {
  const [open, openchange] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchVehicleNP, setSearchVehicleID] = useState("");
  const [clientData, setClientData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [client, setClient] = useState({
    owner_id: '',
    vehicle: '',
    date_of_reg: null, // Initialize with the current date
    mileage_on_reg: 0
  });

  useEffect(() => { 
    const roles = (JSON.parse(window.sessionStorage.getItem('roles'))).split(", ");
    setEditRole(allowedRoles.has(roles.find(role => role === 'cp:ad' || role === 's:ad')));
  }, []);

  const functionopenpopup = async () => {
    await getVehiclesAndOwners();
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  const handleMileageChange = (event) => { 
    setClient((client) => ({ ...client, mileage_on_reg: event.target.value }));
  }


  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleVehicleIDChange = (event) => {
    setSearchVehicleID(event.target.value);
  };

  const setNumberPlate = (value) => {
    let tempObj = client;
    client.vehicle = value;
    setVehicleData(tempObj);
  };

  const getVehiclesAndOwners = async () => {
    try {
      const response = await fetch("http://localhost:5000/common/vehicles", {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      let vData = data.data.vehicles.map((vehicle) => {
        const date = new Date(vehicle.reg_year);
        return {
          ...vehicle, // Copy all attributes of the original vehicle object
          reg_year: `${date.getFullYear()}`, // Modify the reg_year attribute
        };
      });
      setVehicleData(vData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/center/getclients", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        schema: JSON.parse(window.sessionStorage.getItem('schema')),
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setClientData(data.data.clients);
      })
      .catch((error) => { console.log(error) });
  }, []);

  const isValidClient = (client) => {
    const { owner_id, vehicle } = client;

    // Check if owner_id and vehicle exist and are not empty objects
    if (owner_id && vehicle && Object.keys(vehicle).length > 0) {
      if (vehicle.mileage_on_reg !== null && vehicle.date_of_reg !== null) {
        // Validation passed
        return true;
      }
    }
    // Validation failed
    return false;
  };

  const submitClient = async () => {
    if (isValidClient(client)) {
      const response = await fetch("http://localhost:5000/center/client", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          schema: JSON.parse(window.sessionStorage.getItem('schema')),
          vehicle_id: client.vehicle_id,
          date_of_reg: client.date_of_reg,
          mileage_on_reg: client.mileage_on_reg,
          owner_id: client.owner_id 
        }),
      });
      await response.json();

    } else { 
      // show error notif
    }
  };

  let filteredClients = clientData.filter(
    (user) =>
      user.owner_name.toLowerCase().includes(searchName.toLowerCase()) &&
      user.number_plate.toLowerCase().includes(searchVehicleNP.toLowerCase())
  );

  return (
    <div>
      <Headerfile title="Clients" />
      <Card sx={{ height: '81vh', width: '85vw', paddingX: '25px' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                className="search-field"
                id="owner-name"
                variant="standard"
                label="Search by Owner Name"
                value={searchName}
                onChange={handleNameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="search-field"
                id="vehicle-number-plate"
                variant="standard"
                label="Search by Vehicle Number Plate"
                value={searchVehicleNP}
                onChange={handleVehicleIDChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} style={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                className="new-client-button"
                onClick={functionopenpopup}
                disabled={!editRole}
              >
                New Client
              </Button>
            </Grid>
          </Grid>
          <Dialog
            // fullScreen
            open={open}
            onClose={closepopup}
            fullWidth
            maxWidth="xl"
            style={{}}
          >
            <DialogTitle>
              ADD CLIENT{" "}
              <IconButton onClick={closepopup} style={{ float: "right" }}>
                <CloseIcon color="primary"></CloseIcon>
              </IconButton>{" "}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={Array.isArray(vehicleData) ? vehicleData : []}
                    getOptionLabel={(option) => option.number_plate} // Display number_plate in the dropdown
                    value={null}
                    onChange={(event, newValue) => {
                      setNumberPlate(newValue); // Save the selected vehicle
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vehicle"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="standard"
                      />
                    )}
                    renderOption={(props, option) => (
                      <li {...props}>{option.number_plate}</li> // Customize how options are displayed
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="standard-basic" onChange={handleMileageChange} value={client.mileage_on_reg} label="Mileage On Registration" fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                    <DateField label="Date" defaultValue={dayjs()} fullWidth variant="standard"/>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="standard-basic" value={client.vehicle?.model || ''} label="Model" disabled fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="standard-basic" value={client.vehicle?.make || ''} label="Make" disabled fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="standard-basic" value={client.vehicle?.fuel_type || ''} label="Fuel Type" disabled fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField id="standard-basic" value={client.vehicle?.reg_year || ''} label="Registered Year" disabled fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button fullWidth color="primary" variant="contained" onClick={submitClient}>Submit</Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </CardContent>
        <CardContent>
          <div style={{ overflowX: 'auto', position: 'relative' }}>
            <TableContainer component={Paper} sx={{ height: '65vh', marginTop: '1%' }} style={{ overflowX: 'auto' }}>
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
                  {filteredClients.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(row) : value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
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

export default ViewClientel;