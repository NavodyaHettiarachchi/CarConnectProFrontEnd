import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import HistoryFilter from './VehicleHistoryFilter';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

function VehicleHistory({ open, vehicleId, closeVehicleHistory }) {
  //vehicle State
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  
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
  const [openm, setOpenm] = useState(null);

  const handleFilteredHistory = (filteredHistoryData) => {
    // Update state with filtered history data
    setFilteredHistory(filteredHistoryData);
    
  };

  const handleFilterCancel = () => {
    // Reset filtered history to original history
    setFilteredHistory(vehicleHistory);
  };

  const handleYearClick = (year) => {
    setOpenm((prevYear) => (prevYear === year ? null : year));
  }


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

  const handleYearConversion = (date) => {
    return date.split('-')[0];
  }

  const groupByYear = () => {
    console.log("filteredVehicleHistory: ", filteredHistory);
    const historyToGroup = filteredHistory.length > 0 ? filteredHistory : vehicleHistory;
    const groups = {};
    
    historyToGroup.forEach((service, index) => {
      const year = handleYearConversion(service.service_date);
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push({ ...service, index });
    });

    // console.log("group ", groups);
    return groups;
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
          <div>
            <List
              sx={{width: '95%', minWidth: 400, marginTop: 5, marginLeft: 6, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="service-history-subheader"
              subheader={
                <Typography variant="h6" gutterBottom component="div" id="service-history-subheader" sx={{marginBottom: 2 }}>
                  Service History
                </Typography>
              }
            >
               {Object.entries(groupByYear()).map(([year, services]) => (
                <React.Fragment key={year}>
                  <ListItemButton onClick={() => handleYearClick(year)}>
                    <ListItemText primary={`Year: ${year}`} />
                    {openm === year ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openm === year} timeout="auto" unmountOnExit sx={{marginBottom: 2}}>
                    <List disablePadding>
                      <div style={{ overflowX: 'auto', position: 'relative' }}>
                        <TableContainer component={Paper} sx={{ minWidth: 400, marginTop: '1%' }} style={{ overflowX: 'auto' }}>
                          <Table stickyHeader>
                            <TableHead component={Paper}>
                              <TableRow>
                                <TableCell >
                                  Service Date
                                </TableCell>
                                <TableCell  >
                                  Description
                                </TableCell>
                                <TableCell  >
                                  Mileage
                                </TableCell>
                                <TableCell  >
                                  Cost: Rs.
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {services.map((service) => (
                                <TableRow key={service.index}>
                                  <TableCell>{handleDateConversions(service.service_date)}</TableCell>
                                  <TableCell>{service.description}</TableCell>
                                  <TableCell>{service.mileage}</TableCell>
                                  <TableCell>{`Rs. ${parseFloat(service.cost).toFixed(2)}`}</TableCell>
                                  <TableCell>
                                    <IconButton aria-label="delete" sx={{fontSize: 'small'}} >
                                      Download Invoice <DownloadForOfflineIcon sx={{marginLeft: 1}} color="primary"/>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </div>

        </DialogContent>
      </Dialog>

        
      <HistoryFilter
        openFilter={openFilter}
        vehicleId={vehicleId}
        vehicleData={vehicleData}
        onFilteredHistory={handleFilteredHistory}
        closeFilterPopup={() => setOpenFilter(false)}
      />
    </div>
  );
};


export default VehicleHistory;