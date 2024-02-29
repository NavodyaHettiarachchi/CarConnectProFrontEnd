import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import VehicleDetails from "../../Data/Vehicledetails";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { TextField } from '@mui/material'


const Image = styled('img')({
  width: '100%',
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  divs: {
    backgroundColor: 'white', height: 220, marginBottom: 40

  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Vehicle(props) {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { loading = false } = props;
  return (
    <div >
      <Headerfile title="My Vehicle" />
      <div style={{ marginRight: 70, display: 'flex' }}>
        <div style={{ marginLeft: 30, width: '45%', marginTop: 20 }}> {loading ? (
          <Skeleton variant="rectangular" width="40%">
            <div style={{ paddingTop: 5 }} />
          </Skeleton>
        ) : (
          <Image style={{
            width: 640,
            height: 400, marginLeft: 20
          }}
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnN8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        )
        }
          <Box sx={{ height: 10, width: '100%', marginTop: 4, borderRadius: 10 }}>
            <div className={classes.root}>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" inkBarStyle={{ background: 'blue' }}>
                {VehicleDetails.map((item) => {
                  return (
                    <Tab label={item.parameter} {...a11yProps(item.key)} style={{ minWidth: "25%" }} />
                  )
                })}
              </Tabs>
              {VehicleDetails.map((item) => {
                return (
                  <TabPanel style={{ height: 250 }} value={value} index={item.key}>
                    {item.submenu.map((subitem) => {
                      return (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography sx={{ fontSize: '1rem', marginTop: 2 }} variant="h6" gutterBottom component="div">
                            {subitem}
                          </Typography>
                          <TextField sx={{ width: 300 }} className='TextField1'
                            id="standard-basic"
                            disabled
                            variant="standard"
                            onChange={handleChange}
                          />
                        </div>
                      )
                    })}
                  </TabPanel>
                )
              })}
            </div>
          </Box>
        </div>
        <div style={{ marginLeft: 20, marginTop: 15, height: '80vh', width: '40%' }}>
          <div className={classes.divs}>
            <h2>Mileage</h2>
            <div >
              <div style={{ display: 'flex' }}> <Typography sx={{ marginRight: 7, padding: 2 }}>
              Current
              </Typography>
                <TextField sx={{ width: 300, padding: 2 }} className='TextField1'
                  id="standard-basic"
                  disabled
                  variant="standard"
                  onChange={handleChange}
                /></div>
              <div style={{ display: 'flex' }}>
                <Typography sx={{ marginRight: 3, padding: 2 }}>
                  Last Update
                </Typography>
                <TextField sx={{ width: 300, padding: 2 }} className='TextField1'
                  id="standard-basic"
                  disabled
                  variant="standard"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div></div>
          </div>

          <div className={classes.divs}>
          <h2>Mileage</h2>
          </div>
          <div className={classes.divs}>
          <h2>Mileage</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vehicle
