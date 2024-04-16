import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Typography
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import HistoryFilter from './VehicleHistoryFilter';

function VehicleHistory({ open, vehicleId, closeVehicleHistory }) {
  //vehicle State
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    vehicle_id: '',
    number_plate: '',
    model: '',
    make: '',
    reg_year: '',
    mileage: 0
  });
  // filter State
  const [openFilter, setOpenFilter] = useState(false);

  const filtersGiven = [
    { id: 'f_date', type: 'date', label: 'From Date', description: 'Filter history from this date' },
    { id: 't_date', type: 'date', label: 'To Date', description: 'Filter history to this date' },
    { id: 'center_id', type: 'center', label: 'Service/Repair Center', description: 'Filter history from the selected center' },
    { id: 'f_mileage', type: 'number', label: 'From Mileage', description: 'Filter history from this mileage' },
    { id: 't_mileage', type: 'number', label: 'To Mileage', description: 'Filter history to this mileage' },
  ]

  useEffect(() => {
    getInitialData();
  }, [open]);

  const getInitialData = async () => {
    try {
      // const userId = window.sessionStorage.getItem('userId');
      const userId = 4;
      await axios.post(`http://localhost:5000/owner/vehicles/${vehicleId}`, { id: userId })
        .then((res) => {
          setVehicleData(res.data.data.vehicles);
        })
        .catch((err) => console.log(err));
      await axios.post(`http://localhost:5000/owner/vehicles/${vehicleId}/history`)
        .then((res) => {
          setVehicleHistory(res.data.data.serviceHistory[0]);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    };
    computeInitialData();
  };

  const computeInitialData = () => {
    let mileage = Math.max(...vehicleHistory.map(o => o.mileage));
    setVehicleData((prevState) => ({
      ...prevState,
      mileage: mileage
    }));
  };

  const handleFilter = () => {
    setOpenFilter(true);
  };

  const handleClose = () => {
    setVehicleData({
      vehicle_id: '',
      number_plate: '',
      model: '',
      make: '',
      reg_year: '',
      mileage: 0
    });
    setVehicleHistory([]);
    closeVehicleHistory();
  };

  const handleDateConversions = (date) => {
    return date.split('T')[0];
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="cl"
        style={{ margin: '50px' }}
      >
        <DialogTitle>
          {`VEHICLE HISTORY : ${vehicleData.number_plate}`}
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ 'margin': '30px' }}>
          <div>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={6} sm={2}>
                <Typography variant="subtitle1" gutterBottom>
                  {`Owner :  ${vehicleData.name}`}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="subtitle1" gutterBottom>
                  {`Date of register :  ${handleDateConversions(vehicleData.reg_year)}`}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="subtitle1" gutterBottom>
                  {`Number Plate :  ${vehicleData.number_plate}`}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="subtitle1" gutterBottom>
                  {`Make :  ${vehicleData.make}`}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="subtitle1" gutterBottom>
                  {`Model :  ${vehicleData.model}`}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2} style={{position: 'relative'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {`Mileage :  ${vehicleData.mileage}`}
                  </Typography>
                  <IconButton onClick={handleFilter} style={{ marginLeft: '30%', marginTop: '-2%' }}>
                    <MenuIcon color="primary"></MenuIcon>
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>

      <HistoryFilter
        openFilter={openFilter}
        vehicleData={vehicleData}
        setParentVehicleData={() => { console.log('update'); }}
        closeFilterPopup={() => setOpenFilter(false)}
      />
    </div>
  );
};


export default VehicleHistory;