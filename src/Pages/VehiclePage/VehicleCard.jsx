import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { CardMedia, Dialog, DialogContent } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import VehicleDetails from "../../Data/Vehicledetails";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import axios from 'axios';
import Tab from '@material-ui/core/Tab';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { TextField, IconButton } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import { data } from '../../Components/ServiceHome/VBarChart';
import VehicleHistory from '../../Components/Vehicle/VehicleHistory';
import AddEditVehicle from '../../Components/Vehicle/AddEditVehicle';

const Image = styled('img')({
  width: '100%',
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,

  },
  divs: {
    backgroundColor: 'white', height: 220, marginBottom: -15
    , padding: '20px'
  }
}));

var cardStyle = {
  transitionDuration: '0.3s',
  height: '12em',
  color: 'black',
};

function VehicleCard(props) {

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [open, openchange] = useState(false);
  const classes = useStyles();
  const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [value, setValue] = React.useState(0);
  const [vehicleData, setvehicleData] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [openAddEditVehicle, setOpenAddEditVehicle] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [picture, setPicture] = useState(null);
  const openPopupHistory = () => {
    setOpenHistory(true);
  }



  const togglemodal = () => {
    setModal(!modal);
  }
  const { loading = false } = props;
  const handleOpenSearchDialog = () => {
    setSearchDialogOpen(true);
  };

  useEffect(() => {
    fetch("http://localhost:5000/owner/vehicles", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: window.sessionStorage.getItem('userId'),
      }),

    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data.data);
        let vehi = data.data.vehicles.map((vehicle) => {
          return {
            ...vehicle,
            photo_1: handleImageLoad(vehicle.photo_1),
          }
        });
        setvehicleData(vehi);
        console.log('vehicle', vehicleData);
      })
      .catch((error => { console.log(error) }));
  }, [isUpdated]);

  const functionopenpopup = async (vehicle) => {
    console.log(vehicle);
    setSelectedVehicle(vehicle);
    
    openchange(true);
  };
  const closepopup = () => {
    setSelectedVehicle(null);
    openchange(false);
  };

  const openAddVehiclePopup = async (vehicle) => {

    // setopenAddVehicle(true);
    setOpenAddEditVehicle(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getRegyear = (year) =>{
    if(year){
      return year.split('T')[0]
    }else{
      return 0;
    }
  }

  const handleImageLoad = (imageData) => {
    // Convert Buffer to Blob URL

    try {
      console.log(imageData?.data);
      const blob = new Blob([imageData]);
      // Create Object URL from Blob
      const objectURL = URL.createObjectURL(blob);
      return objectURL;
    } catch (error) {
      console.log(error);
    }


    // console.log(imageData);
    // const blob = new Blob([imageData], { type: 'image/png' }); // Adjust the type according to your image format
    // const url = URL.createObjectURL(blob);
    // return url;
  };

  return (
    <div><Headerfile title="My Vehicles" />

      <Grid container spacing={2} sx={{
        padding: '20px',
        width: '140ch',
      }}
      >

        <Grid item xs={4}>
          <Item > <CardContent style={cardStyle} sx={{
            padding: '20px',
          }}>
            <Typography sx={{ fontSize: 80 }} color="text.secondary" gutterBottom>
              <Button sx={{ "&:hover": { backgroundColor: "transparent" } }} onClick={handleOpenSearchDialog}>
                <Typography sx={{ fontSize: 80 }} onClick={() => openAddVehiclePopup()}  >
                  +
                </Typography>
              </Button>
            </Typography>
          </CardContent></Item>

          <AddEditVehicle
            open={openAddEditVehicle}
            isUpdate={isUpdate}
            vehicleData={{}}
            closeAddEditVehicle={() => { setOpenAddEditVehicle(false); setIsUpdated(!isUpdated); }}
            isUpdated={isUpdated}
          />

        </Grid>

        {vehicleData?.map((item) => {
          return (
            <Grid item xs={4} position={"relative"}>
              <Item>
                <CardContent style={cardStyle}>
{/* 
                  {item.photo_1 ? (
                    <img
                      src={item.photo_1}
                      alt="Buffer"
                      onLoad={handleImageLoad}
                      style={{ maxWidth: '100%' }}
                      onError={(e) => {
                        e.target.src = 'placeholder-image-url'; // Replace with a placeholder image URL
                      }}
                    />
                  ) : (
                    <p>Loading...</p>
                  )} */}

                  <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                    {item.number_plate}
                  </Typography>
                  <Button onClick={togglemodal}>
                    <Typography vehicle={item?.make} onClick={() => functionopenpopup(item)}>
                      View
                    </Typography>
                  </Button>

                </CardContent></Item>
            </Grid>
          )
        })}
      </Grid>

      <Dialog
        // fullScreen
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="xl"
        style={{}}
      >
        <div>
          <IconButton onClick={closepopup} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
          <Headerfile title="My Vehicle" />
          <div style={{ marginRight: 70, display: 'flex' }}>
            <div style={{ marginLeft: 60, width: '45%', marginTop: 20 }}> {loading ? (
              <Skeleton variant="rectangular" width="40%">
                <div style={{ paddingTop: 5 }} />
              </Skeleton>
            ) : (
              <Image style={{
                width: 620,
                height: 380, marginLeft: 60, marginTop: 20
              }}
                src={selectedVehicle?.photo_1}
                alt=""
              />
            )
            }
              <Box sx={{ height: 10, width: '100%', marginTop: 1, marginLeft: 2 }}>

                <div className={classes.divs}>
                  <h4>Major Information</h4>

                  <div >
                    <div style={{ display: 'flex' }}> <Typography sx={{ marginRight: 7, padding: 2 }}>
                      Make
                    </Typography>
                      <TextField sx={{ width: 300, padding: 2 }} className='TextField1'
                        id="standard-basic"
                        disabled
                        variant="standard"
                        onChange={handleChange}
                        value={selectedVehicle?.make}
                      />
                       <Button variant="contained" onClick={openPopupHistory} color="primary" className='Button' sx={{ height:40,marginTop:6,right: 0, left: 70 }}>
                      View history
                    </Button>
                    </div>
                    <div style={{ display: 'flex' ,marginTop:-20}}>
                      <Typography sx={{ marginRight: 3, padding: 2 }}>
                        Model
                      </Typography>
                      <TextField sx={{ width: 300, padding: 2, marginLeft: 3 }} className='TextField1'
                        id="standard-basic"
                        disabled
                        variant="standard"
                        onChange={handleChange}
                        value={selectedVehicle?.model}
                      />
                    </div>

                  </div>
                </div>


              </Box>
            </div>
            <div style={{ marginLeft: 125, marginTop: 15, height: '80vh', width: '40%' }}>
              <div className={classes.divs}>
                <h4>Chassis and Engine No</h4>
                <div >
                  <div style={{ display: 'flex' }}> <Typography sx={{ marginRight: 7, padding: 2, marginTop: 1 }}>
                    Chassis number
                  </Typography>
                    <TextField sx={{ width: 300, padding: 2 }} className='TextField1'
                      id="standard-basic"
                      disabled
                      variant="standard"
                      onChange={handleChange}
                      value={selectedVehicle?.chassis_no}
                    /></div>
                  <div style={{ display: 'flex' }}>
                    <Typography sx={{ marginRight: 3, padding: 2, marginTop: 1 }}>
                      Engine Number
                    </Typography>
                    <TextField sx={{ width: 300, padding: 2, marginLeft: 4 }} className='TextField1'
                      id="standard-basic"
                      disabled
                      variant="standard"
                      onChange={handleChange}
                      value={selectedVehicle?.engine_no}
                    />
                  </div>
                </div>
              </div>

              <div className={classes.divs}>
                <h4>Mileage</h4>
                <div style={{ display: 'flex' }}> <Typography sx={{ marginRight: 7, padding: 2, marginTop: 1 }}>
                  Current
                </Typography>
                  <TextField sx={{ width: 300, padding: 2, marginLeft: 6 }} className='TextField1'
                    id="standard-basic"
                    disabled
                    variant="standard"
                    onChange={handleChange}
                    value={selectedVehicle?.mileage}
                  /></div>
                <div style={{ display: 'flex' }}>
                  <Typography sx={{ marginRight: 3, padding: 2, marginTop: 1 }}>
                    Last Update
                  </Typography>
                  <TextField sx={{ width: 300, padding: 2, marginLeft: 6 }} className='TextField1'
                    id="standard-basic"
                    disabled
                    variant="standard"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={classes.divs}>
                <h2>Registration details</h2>
                <div style={{ display: 'flex' }}> <Typography sx={{ marginRight: 7, padding: 2 }}>
                  Manufactured year
                </Typography>
                  <TextField sx={{ width: 300, padding: 2, marginLeft: -4 }} className='TextField1'
                    id="standard-basic"
                    disabled
                    variant="standard"
                    onChange={handleChange}
                    value={selectedVehicle?.mfd_year}
                  /></div>
                <div style={{ display: 'flex' }}>
                  <Typography sx={{ marginRight: 3, padding: 2 }}>
                    Registered year
                  </Typography>
                  <TextField sx={{ width: 300, padding: 2, marginLeft: 2 }} className='TextField1'
                    id="standard-basic"
                    disabled
                    variant="standard"
                    onChange={handleChange}

                    value={getRegyear(selectedVehicle?.reg_year)}

                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </Dialog>

      <VehicleHistory
        open={openHistory}

        vehicleId={1}
        closeVehicleHistory={() => { setOpenHistory(false) }}
      />



      {/* <Dialog open={isSearchDialogOpen} onClose={handleCloseSearchDialog} maxWidth="lg" fullWidth>
      <DialogContent>
        <SearchVehicleId onClose={handleCloseSearchDialog} />
      </DialogContent>
    </Dialog> */}
    </div>

  )
}

export default VehicleCard
