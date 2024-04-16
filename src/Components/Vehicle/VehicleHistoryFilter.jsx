import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
  IconButton,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from '@material-ui/core/styles';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import Slider from '@mui/material/Slider';

const useStyles = makeStyles({
  dialogContent: {
    padding: 0, // Remove padding
  },
});

const minDistance = 10000;

function VehicleHistoryFilter({ openFilter, vehicleData, setParentVehicleData, closeFilterPopup }) { 

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // states
  const [filterData, setFilterData] = useState({
    fromDate: dayjs("01-01-1990"),
    toDate: dayjs(),
    center: null,
    mileage: [0, 300000]
  });
  const [centerData, setCenterData] = useState([]);

  useEffect(() => { 
    try {
      axios.get('http://localhost:5000/parameter/centers')
        .then((res) => { 
          setCenterData(res.data.data.centers);
        })
        .catch((err) => { 
          console.log(err);
        });
    } catch (err) { 
      console.log(err);
    }
  }, [openFilter])


  const handleMileageChange = (event, newValue, activeThumb) => { 
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 300000 - minDistance);
        // setValue2([clamped, clamped + minDistance]);
        setFilterData((prevState) => ({ 
          ...prevState,
          mileage: [clamped, clamped + minDistance],
        }))
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        // setValue2([clamped - minDistance, clamped]);
        setFilterData((prevState) => ({
          ...prevState,
          mileage: [clamped - minDistance, clamped],
        }))
      }
    } else {
      // setValue2(newValue);
      setFilterData((prevState) => ({
        ...prevState,
        mileage: newValue,
      }))
    }
  }

  const handleChange = (event, value, property) => {
    if (property === 'fromDate' || property === 'toDate') {
      const value = event;
      // const formattedValue = value.format('DD-MM-YYYY');
      setFilterData((prevState) => ({
        ...prevState,
        [property]: value,
      }))
    } else {
      setFilterData((prevState) => ({
        ...prevState,
        [property]: value,
      }))
    }
  };


  const handleClose = () => { 
    setFilterData({
      fromDate: dayjs("01-01-1990"),
      toDate: dayjs(),
      center: null,
      mileage: [0, 300000]
    });
    setCenterData([]);
    closeFilterPopup();
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openFilter}
        onClose={handleClose}
        maxWidth={false}
        PaperProps={{
          style: {
            width: '30%',
            height: '100%',
            right: 0,
            top: 0,
            bottom: 0,
            position: 'fixed',
            padding: 'none',
            overflowX: 'hidden'
          },
        }}
      >
        <DialogContent classes={{ root: classes.dialogContent }} style={{ padding: '0px', overflowX: 'hidden' }} >
          <div style={{ backgroundColor: '#843fc5', height: '20%', paddingLeft: '20px', position: 'relative' }}>
            <IconButton onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <CloseIcon color="black"></CloseIcon>
            </IconButton>
            <div style={{ position: 'absolute', bottom: '10px', width: '100%' }}>
              <Typography variant="h4" gutterBottom>
                {`Filter Vehicle History`}
              </Typography>
              <Typography variant="subtitle" gutterBottom>
                {`Filter history according to what you want from dates, to mileage to service or repair center`}
              </Typography>
            </div>
          </div>

          <div style={{ padding: '30px' }}>
            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="From Date"
                      value={filterData.fromDate}
                      onChange={(event, newValue) => handleChange(event, newValue, 'fromDate')}
                      inputFormat="DD-MM-YYYY"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="To Date"
                      value={filterData.toDate}
                      onChange={(event, newValue) => handleChange(event, newValue, 'toDate')}
                      inputFormat="DD-MM-YYYY"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  id="combo-box-demo"
                  options={Array.isArray(centerData) ? centerData : []}
                  getOptionLabel={(option) => option.name}
                  value={filterData.center || null}
                  onChange={(event, newValue) => {
                    handleChange(event, newValue, 'center');
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Center to filter from"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                    />
                  )}
                  renderOption={(props, option) => <li {...props}>{option.name}</li>}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography id="input-slider" variant="body2" gutterBottom>
                  Mileage
                </Typography>
                <Slider
                  getAriaLabel={() => 'Minimum distance shift'}
                  value={filterData.mileage}
                  onChange={handleMileageChange}
                  valueLabelDisplay="auto"
                  // getAriaValueText={valuetext}
                  disableSwap
                  defaultValue={[0, 300000]}
                  max={300000}
                /> 
                <Typography id="input-slider" variant="caption" gutterBottom style={{ float: 'left' }}>
                  {`Mileage From: ${filterData.mileage[0]} km` }
                </Typography>
                <Typography id="input-slider" variant="caption" gutterBottom style={{float: 'right'}}>
                  {`Mileage To: ${filterData.mileage[1]} km`}
                </Typography>
              </Grid>
            </Grid>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleHistoryFilter;