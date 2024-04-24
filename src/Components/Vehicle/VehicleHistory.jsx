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
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import PdfInvoice from "../PDFInvoice/PdfInvoice";

function VehicleHistory({ open, vehicleId, closeVehicleHistory }) {
  //vehicle State
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  
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
  const [openm, setOpenm] = useState([]);
  const [group, setGroup] = useState([]);
  const [sortedYears, setSortedYears] = useState([]);
  const [centerData, setCenterData] = useState([]);
  const [getSchema, setGetschema] = useState([]);
  
  const handleFilteredHistory = (filteredHistoryData) => {
    setFilteredHistory(filteredHistoryData);
  };

  const handleYearClick = (year) => {
    console.log("Clicked year:", year);
    console.log("Current open years:", openm);

    setOpenm((prevYears) => {
      const isOpen = prevYears.includes(year);
      if (isOpen) {
        // Year is already open, close it
        return prevYears.filter((prevYear) => prevYear !== year);
      } else {
        // Year is not open, toggle it
        return [...prevYears, year];
      }
    });
  }


  // const filtersGiven = [
  //   { id: 'f_date', type: 'date', label: 'From Date', description: 'Filter history from this date' },
  //   { id: 't_date', type: 'date', label: 'To Date', description: 'Filter history to this date' },
  //   { id: 'center_id', type: 'center', label: 'Service/Repair Center', description: 'Filter history from the selected center' },
  //   { id: 'f_mileage', type: 'number', label: 'From Mileage', description: 'Filter history from this mileage' },
  //   { id: 't_mileage', type: 'number', label: 'To Mileage', description: 'Filter history to this mileage' },
  // ]

  useEffect(() => {
    getInitialData();
  }, [open]);

  const getInitialData = async () => {
    try {
      // const userId = window.sessionStorage.getItem('userId');
      // console.log("userid:", userId);
      const userId = 4;
      console.log(vehicleId);
      await axios.post(`http://localhost:5000/owner/vehicles/${vehicleId}`, { id: userId })
      .then((res) => {
        setVehicleData(res.data.data.vehicles);
      })
      .catch((err) => console.log(err));

      await axios.post(`http://localhost:5000/owner/vehicles/${vehicleId}/history`)
      .then((res) => {
        const historyData = res.data.data.serviceHistory[0];
        setVehicleHistory(historyData);
        const schema = historyData[0].schema;
        setGetschema(schema);
      })
      .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    };
    computeInitialData();
  };

  useEffect(() => {
    console.log("schema: ", getSchema);
  }, [getSchema]);

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

  useEffect(() => {
    if (vehicleHistory.length > 0) {
      groupByYear();
    }
  }, [vehicleHistory, filteredHistory]);

  const handleYearConversion = (date) => {
    return new Date(date).getFullYear();
  }

  const groupByYear = () => {
    const historyToGroup = filteredHistory.length > 0 ? filteredHistory : vehicleHistory;
    let years = Array.from(new Set(historyToGroup.map((service) => handleYearConversion(service.service_date))));
    years=  years.sort((a, b) => b - a);  // Sort the years in ascending order

    const groups = {};
    
    years.forEach((year) => {
      groups[year] = [];
      
    });

    historyToGroup.forEach((service, index) => {
      const year = handleYearConversion(service.service_date);
      groups[year].push({ ...service, index });
    });

    setGroup(groups);
    setSortedYears(years);
  };



  const handleDateConversions = (date) => {
    return date.split('T')[0];
  }

   //pdfInvoice genaration
  //collect final values

  const getCenterData = async () => {
    try {
      await axios.post(`http://localhost:5000/owner/vehicle/pdf`, { schema: getSchema })
      .then((res) => {
        const center_Data = res.data.data.centerData;
        setCenterData(center_Data);
      })
      .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }


  const handleRowClick = (details) => {
    // Check if details object exists
    if (details && details.details) {
        let s_details = details.details[0];
        let s_item = s_details.item;
        let s_type = s_details.type;
        let s_price = s_details.price;
        let s_quantity = s_details.quantity;

        generateInvoiceData(s_item, s_type, s_price, s_quantity);
        getCenterData();
    } else {
        console.log("Details not found or invalid format");
    }
};

  const generateInvoiceData = (s_item, s_type, s_price, s_quantity) => {
    const owner_name = vehicleData.name;
    const owner_phoneNo = "_";
    const CompanyName = centerData.name;
    const street_1 = centerData.street_1;
    const street_2 = centerData.street_2;
    const city = centerData.city;
    const province = centerData.province;
    const phone = centerData.phone;
    const email = centerData.email;
    const vehicle_id = vehicleData.number_plate;
    const fuel_type = "_";
    const model = vehicleData.model;
    const mileage = vehicleData.mileage;
    const selectedItems = [{
        Type: s_type,
        Item: s_item,
        Price: `Rs. ${s_price}`,
        Quantity: s_quantity,
        Total: `Rs. ${s_quantity*s_price}`,
    }];
    const full_Amount =  s_quantity * s_price;

    setInvoiceData({
      vehicle_id,
      fuel_type,
      model,
      mileage,
      selectedItems,
      full_Amount,
      CompanyName,
      street_1,
      street_2,
      city,
      province,
      phone,
      email,
      owner_name,
      owner_phoneNo,
    });

    console.log("in genarate invoiceData", invoiceData);
  };


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
            <Grid container spacing={3} justifyContent="center" bgcolor={'#CCD0FF'} padding={2}>
              <Grid item xs={6} sm={2}>
                <Typography variant="button"  display="block" gutterBottom>
                <strong>Owner :</strong>  {vehicleData.name}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="button"  display="block" gutterBottom>
                  <strong>Date of register :</strong>  {handleDateConversions(vehicleData.reg_year)}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="button"  display="block" gutterBottom>
                <strong>Number Plate : </strong> {vehicleData.number_plate}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="button"  display="block" gutterBottom>
                <strong>Make : </strong> {vehicleData.make}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Typography variant="button"  display="block" gutterBottom>
                <strong>Model : </strong> {vehicleData.model}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2} style={{position: 'relative'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="button"  display="block" gutterBottom>
                    <strong>Mileage : </strong> {vehicleData.mileage}
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
              sx={{width: '94%', minWidth: 300, marginTop: 5, marginLeft: 6, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="service-history-subheader"
              subheader={
                <Typography variant="h6" gutterBottom component="div" id="service-history-subheader" sx={{marginBottom: 2 }}>
                  SERVICE HISTORY
                </Typography>
              }
            >
               {sortedYears.map((year) => (
                <React.Fragment key={year}>
                  <ListItemButton onClick={() => handleYearClick(year)}>
                    <ListItemText primary={` ${year}`} />
                    {openm.includes(year) ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={openm.includes(year)} timeout="auto" unmountOnExit sx={{marginBottom: 2}}>
                    <List disablePadding>
                      <div style={{ overflowX: 'auto', position: 'relative' }}>
                        <TableContainer  sx={{ minWidth: 400, marginTop: '1%' }} style={{ overflowX: 'auto' }}>
                          <Table>
                            <TableHead component={Paper} sx={{minHeight: '3px', padding: 0, bgcolor: '#CCD0FF' , boxShadow: 'none' }}>
                              <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>
                                  SERVICE DATE
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>
                                  DESCRIPTION
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>
                                  MILEAGE
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>
                                  COST
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>
                                  
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>
                                  
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {group[year].map((service) => (
                                <TableRow key={service.index} onClick={() => handleRowClick(service)}>
                                  <TableCell>{handleDateConversions(service.service_date)}</TableCell>
                                  <TableCell>{service.description}</TableCell>
                                  <TableCell>{service.mileage}</TableCell>
                                  <TableCell>{`Rs. ${parseFloat(service.cost).toFixed(2)}`}</TableCell>
                                  {invoiceData === null &&  (
                                  <TableCell align='right'>
                                    <IconButton aria-label="delete" sx={{fontSize: 'small'}}>
                                      Genarate Invoice <RestartAltRoundedIcon sx={{marginLeft: 1}} color="primary"/>
                                    </IconButton>
                                  </TableCell>)}
                                  <TableCell align='right'>
                                    {invoiceData &&<PdfInvoice invoiceData={invoiceData} />}
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