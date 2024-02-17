import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import VehicleDetails from "../../Data/Vehicledetails";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';




const Image = styled('img')({
  width: '100%',
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
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
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}>
        {/* <Box sx={{ margin: 5 }}>
          {loading ? (
            <Skeleton variant="circular">
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
          )}
        </Box> */}

      </Box>

      {loading ? (
        <Skeleton variant="rectangular" width="60%">
          <div style={{ paddingTop: 10 }} />
        </Skeleton>
      ) : (
        <Image style={{
          width: 640,
          height: 450,
        }}
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnN8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      )
      }
      <Box sx={{ paddingTop: 4, height: 10 }}>
        <div className={classes.root}>

          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" inkBarStyle={{ background: 'blue' }}>
            {VehicleDetails.map((item) => {
              return (
                <Tab label={item.parameter} {...a11yProps(item.key)} />
              )
            })}
          </Tabs>
          {VehicleDetails.map((item) => {
            return (
              <TabPanel value={value} index={item.key}>
                {item.submenu.map((subitem) => {
                  return (
                    <div>
                      <Typography variant="h6" gutterBottom component="div">
                        {subitem}
                      </Typography>
                    </div>
                  )
                })}
              </TabPanel>
            )
          })}

        </div>
      </Box>
    </div>
  )
}

export default Vehicle
