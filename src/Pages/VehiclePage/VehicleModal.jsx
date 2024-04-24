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
    , padding: '20px'
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


function VehicleModal(props) {
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const togglemodal = () => {
    setModal(!modal);
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { loading = false } = props;

  return (
    <div className='modal'>
      <Headerfile title="My Vehicle" />
      <div style={{ marginRight: 70, display: 'flex' }}>
        <div style={{ marginLeft: 30, width: '45%', marginTop: 20 }}> {loading ? (
          <Skeleton variant="rectangular" width="40%">
            <div style={{ paddingTop: 5 }} />
          </Skeleton>
        ) : (
          <Image style={{
            width: 640,
            height: 400, marginLeft: 0
          }}
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnN8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        )
        }
          <Box sx={{ height: 10, width: '100%', marginTop: 4, marginLeft: 2 }}>
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
      </div>
    </div>
  )
}

export default VehicleModal
