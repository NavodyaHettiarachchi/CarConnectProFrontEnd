import React, { useState, useEffect } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
  Grid,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

const fields = [
  { id: 'number_plate', label: 'Number Plate', type: 'text' },
  { id: 'model', label: 'Model', type: 'text' },
  { id: 'make', label: 'Make', type: 'text' },
  { id: 'engine_no', label: 'Engine No', type: 'text' },
  { id: 'chassis_no', label: 'Chassis No', type: 'text' },
  { id: 'transmission_type', label: 'Transmission Type', type: 'select' },
  { id: 'fuel_type', label: 'Fuel Type', type: 'select' },
  { id: 'seating_capacity', label: 'Seating Capacity', type: 'number' },
  { id: 'reg_year', label: 'Year of Vehicle Register', type: 'date' },
  { id: 'mileage', label: 'Mileage', type: 'number' },
  { id: 'photo_1', label: 'Photo 1', type: 'file' },
  { id: 'photo_2', label: 'Photo 2', type: 'file' },
  { id: 'photo_3', label: 'Photo 3', type: 'file' },
  { id: 'document', label: 'Document', type: 'file' }
];

function AddEditVehicle({ open, isUpdate, vehicleData, closeAddEditVehicle}) {


  // vehicle states
  const [vehicleD, setVehicleD] = useState({
    number_plate: '',
    model: '',
    make: '',
    engine_no: '',
    chassis_no: '',
    transmission_type: 'M',
    fuel_type: 'P',
    seating_capacity: 0,
    photo_1: null,
    photo_2: null,
    photo_3: null,
    document: null,
    service_history: null,
    mileage: 0,
    reg_year: dayjs(),
  });

  // parameter states
  const [fuelTypes, setFuelTypes] = useState([]);
  const [transmissionTypes, setTransmissionTypes] = useState([]);



  // Alerts
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleClose = () => {
    closeAddEditVehicle();
  };

  const handleChange = (value, property) => {
    setVehicleD((prevVehicleD) => ({
      ...prevVehicleD,
      [property]: value,
    }));
  };

  const handleKeyPress = (event, property) => {
    const charCode = event.charCode;
    // Only allow numeric characters and the decimal point
    if (
      charCode < 48 ||
      charCode > 57 ||
      (charCode === 46 && vehicleD[property].includes("."))
    ) {
      event.preventDefault();
    }
  };

  const getAllParameters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/parameter/fuelType', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      setFuelTypes(response.data.data.fuelType);

      const res = await axios.get('http://localhost:5000/parameter/transmissionType', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      setTransmissionTypes(res.data.data.transmissionType);
      setVehicleD(
        {number_plate: '',
        model: '',
        make: '',
        engine_no: '',
        chassis_no: '',
        seating_capacity: 0,
        photo_1: null,
        photo_2: null,
        photo_3: null,
        document: null,
        service_history: null,
        mileage: 0,
        reg_year: dayjs(),
        fuel_type: fuelTypes[0]?.type,
        transmission_type: transmissionTypes[0]?.type}
      );

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const handleAddVehicle = async () => { 
    console.log('vehicle: ', vehicleD);
    console.log('year', vehicleD.reg_year.$y)
    const formData = new FormData();
    formData.append('photo_1', vehicleD.photo_1);
    formData.append('photo_2', vehicleD.photo_2);
    formData.append('photo_3', vehicleD.photo_3);
    formData.append('document', vehicleD.document);
    formData.append('number_plate', vehicleD.number_plate);
    formData.append('model', vehicleD.model);
    formData.append('make', vehicleD.make);
    formData.append('engine_no', vehicleD.engine_no);
    formData.append('chassis_no', vehicleD.chassis_no);
    formData.append('transmission_type', vehicleD.transmission_type);
    formData.append('fuel_type', vehicleD.fuel_type);
    formData.append('seating_capacity', vehicleD.seating_capacity);
    formData.append('mileage', vehicleD.mileage);
    formData.append('owner_id', JSON.parse(window.sessionStorage.getItem('userId')));
    formData.append('reg_year', dayjs(vehicleD.reg_year));

    try {
      const res = await axios.post('http://localhost:5000/owner/vehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      handleClose();
    } catch (error) {
      console.error('Error adding vehicle:', error);
      // Handle error (e.g., display error message)
    }
  }

  const handleAlertClose = () => {
    setAlertMessage("");
    setAlertType("");
    setOpenAlert(false);
  };

  useEffect(() => {
    setVehicleD(vehicleData);
    getAllParameters();
  }, [open]);

  const getArr = (field) => {
    switch (field) {
      case 'fuel_type':
        return fuelTypes;
      case 'transmission_type':
        return transmissionTypes;
      default:
        return [];
    }
  }

  return (
    <div>
      {openAlert && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleAlertClose}
        >
          <Alert severity={alertType}>{alertMessage}</Alert>
        </Snackbar>
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {isUpdate ? `EDIT VEHICLE: ${vehicleD.number_plate}` : `ADD NEW VEHICLE`}
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} justifyContent="center">
            {fields.map((field) => {
              return (
                <Grid item xs={12} sm={4}>
                  {field.type === 'text' ?
                    <>
                      <InputLabel id="demo-simple-select-standard-label">{field.label}</InputLabel>
                      <TextField
                        variant="standard"
                        id="standard-basic"
                        name={field.id}
                        fullWidth
                        value={vehicleD[field.id]}
                        onChange={(event) => handleChange(event.target.value, field.id)}
                      />
                    </> : field.type === 'number' ?
                      <>
                        <InputLabel id="demo-simple-select-standard-label">{field.label}</InputLabel>
                        <TextField
                          variant="standard"
                          id="standard-basic"
                          name={field.id}
                          fullWidth
                          value={vehicleD[field.id]}
                          onChange={(event) => {
                            const value = event.target.value;
                            const mileage = value ? parseFloat(value) / 1 : null;
                            setVehicleD({ ...vehicleD, [field.id]: mileage });
                          }}
                          onKeyPress={(event) => handleKeyPress(event, field.id)}
                        />
                      </> : field.type === 'select' ?
                        <>
                          <InputLabel id="demo-simple-select-standard-label">{field.label}</InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            variant="standard"
                            id="demo-simple-select-standard"
                            // label={field.label}
                            name={field.id}
                            fullWidth
                            value={vehicleD[field.id]}
                          >
                            {getArr(field.id).map((item) => (
                              <MenuItem key={item.type} value={item.type}>
                                {item.description}
                              </MenuItem>
                            ))}
                          </Select>
                        </> : field.type === 'date' ? <>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                              <DatePicker
                                label={field.label}
                                value={vehicleD.reg_year}
                                variant="standard"
                                fullWidth
                                onChange={(newValue) => setVehicleD((vehicle) => ({ 
                                  ...vehicle,
                                  [field.id]: newValue,
                                }))}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </> : <>
                          <InputLabel id="demo-simple-select-standard-label">{field.label}</InputLabel>
                          <TextField
                            type="file"
                            variant="standard"
                            id="standard-basic"
                            name={field.id}
                            onChange={(event) => { setVehicleD({ ...vehicleD, [field.id]: event.target.files[0] }); }}
                          />
                        </>
                  }
                </Grid>
              );
            })}
            <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
              <Button variant="contained" onClick={handleAddVehicle} color="primary" className='Button' sx={{ right: 0, left: 'auto' }}>
                {isUpdate ? 'Edit Vehicle' : 'Add Vehicle'}
              </Button>
            </Grid> 
          </Grid>
        </DialogContent>
      </Dialog>
    </div>

  );
};

export default AddEditVehicle;