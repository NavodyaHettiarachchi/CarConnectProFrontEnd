import React, { useState } from 'react';
import SearchVehicleId from '../../Components/OnGoingServices-Component/SearchVehicleId';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Dialog, DialogContent } from '@mui/material';
import VehicleModal from './VehicleModal';
import Skeleton from '@mui/material/Skeleton';
import VehicleDetails from "../../Data/Vehicledetails";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Headerfile from '../../Components/Page-Header/CardHeader';
import { TextField, IconButton } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";

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
        backgroundColor: 'white', height: 220, marginBottom: 40
        , padding: '20px'
    }
}));

var cardStyle = {
    transitionDuration: '0.3s',
    height: '12em',
    color: 'black',
};

function VehicleCard(props) {
    const [open, openchange] = useState(false);
    const classes = useStyles();
    const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);
    const [modal, setModal] = useState(false);
    const [value, setValue] = React.useState(0);
    const togglemodal = () => {
        setModal(!modal);
    }
    const { loading = false } = props;
    const handleOpenSearchDialog = () => {
        setSearchDialogOpen(true);
    };

    const functionopenpopup = async () => {

        openchange(true);
    };
    const closepopup = () => {
        openchange(false);
    };

    const handleCloseSearchDialog = () => {
        setSearchDialogOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


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

    return (
        <div><Headerfile title="My Vehicles" />

            <Grid container spacing={2} sx={{
                padding: '20px',
                width: '140ch',
            }} >

                <Grid item xs={4}>
                    <Item > <CardContent style={cardStyle} sx={{
                        padding: '20px',
                    }}>
                        <Typography sx={{ fontSize: 80 }} color="text.secondary" gutterBottom>
                            <Button sx={{ "&:hover": { backgroundColor: "transparent" } }} onClick={handleOpenSearchDialog}>
                                <Typography sx={{ fontSize: 80 }} >
                                    +
                                </Typography>
                            </Button>
                        </Typography>
                    </CardContent></Item>
                </Grid>
                <Grid item xs={4}>
                    <Item> <CardContent style={cardStyle}>
                        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                            KY-8375
                        </Typography>
                        <Button onClick={togglemodal}>
                            <Typography onClick={functionopenpopup}>
                                View
                            </Typography>
                        </Button>
                    </CardContent></Item>
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
                              width: 640,
                              height: 400, marginLeft: 20
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
                        <div style={{ marginLeft: 150, marginTop: 15, height: '80vh', width: '40%' }}>
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
                            </div>

                            <div className={classes.divs}>
                                <h2>Mileage</h2>
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
                            <div className={classes.divs}>
                                <h2>Mileage</h2>
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
                        </div>
                    </div>
                </div>

            </Dialog>




            {/* <Dialog open={isSearchDialogOpen} onClose={handleCloseSearchDialog} maxWidth="lg" fullWidth>
      <DialogContent>
        <SearchVehicleId onClose={handleCloseSearchDialog} />
      </DialogContent>
    </Dialog> */}
        </div>
    )
}

export default VehicleCard
