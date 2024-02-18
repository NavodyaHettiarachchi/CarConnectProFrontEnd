import React, { useState } from 'react';
import SearchVehicleId from '../../Components/OnGoingServices-Component/SearchVehicleId';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Dialog, DialogContent } from '@mui/material';
import Headerfile from '../../Components/Page-Header/CardHeader';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


var cardStyle = {
    transitionDuration: '0.3s',
    height: '12em',
    color: 'black',
};

function OnGoingServices() {
    const [isSearchDialogOpen, setSearchDialogOpen] = useState(false);

    const handleOpenSearchDialog = () => {
      setSearchDialogOpen(true);
    };

    const handleCloseSearchDialog = () => {
      setSearchDialogOpen(false);
    };

    return (
        <div><Headerfile title="On going Services" />

            <Grid container spacing={2} sx={{
                padding: '20px',
                width: '140ch',
            }} >

                <Grid item xs={4}>
                    <Item > <CardContent style={cardStyle} sx={{
                        padding: '20px',
                    }}>
                        <Typography sx={{ fontSize: 80 }} color="text.secondary" gutterBottom>
                            <Button sx={{ "&:hover": { backgroundColor: "transparent" } }}  onClick={handleOpenSearchDialog}>
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
                            Service
                        </Typography>
                        <Typography variant="h5" component="div">
                           For vehicle number KY-8375
                        </Typography>
                       
                    </CardContent></Item>
                </Grid>
                <Grid item xs={4}>
                    <Item> <CardContent style={cardStyle}>
                        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                            Body Wash
                        </Typography>
                        <Typography variant="h5" component="div">
                           For vehicle number KY-1222
                        </Typography>
                        <Button  >
                            <Typography>
                                Remove
                            </Typography>
                        </Button>
                    </CardContent>
                    </Item>
                </Grid>
                <Grid item xs={4}>
                    <Item> <CardContent style={cardStyle}>
                        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
                            Under Carriage wash
                        </Typography>
                        <Typography variant="h5" component="div">
                            Pending at 100000km
                        </Typography>

                    </CardContent></Item>
                </Grid>
            </Grid>


            <Dialog open={isSearchDialogOpen} onClose={handleCloseSearchDialog} maxWidth="lg" fullWidth>
              <DialogContent>
                <SearchVehicleId onClose={handleCloseSearchDialog} />
              </DialogContent>
            </Dialog>
        </div>
    )
}

export default OnGoingServices
