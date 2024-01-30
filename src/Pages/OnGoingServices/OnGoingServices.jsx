import React from 'react';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

var cardStyle = {
    
    
    transitionDuration: '0.3s',
    height: '14vw'
};

function OnGoingServices() {
  return (
    <div>

      <Grid container spacing={2} sx={{
        padding: '20px',
      }} >
        <Grid item xs={4}>
          <Item > <CardContent  style={cardStyle} sx={{
            padding: '20px',
          }}>
            <Typography sx={{ fontSize: 91 }} color="text.secondary" gutterBottom>
              <Button sx={{ "&:hover": { backgroundColor: "transparent" }} } >
               <Typography  sx={{ fontSize: 91 }}>
                +
               </Typography>
              </Button>
            </Typography>
            
           
          </CardContent></Item>
        </Grid>
        <Grid item xs={4}>
          <Item> <CardContent  style={cardStyle}>
            <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
              Service
            </Typography>
            <Typography variant="h5" component="div">
              Pending at 100000km
            </Typography>
           
          </CardContent></Item>
        </Grid>
        <Grid item xs={4}>
          <Item> <CardContent  style={cardStyle}>
            <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
              Body Wash
            </Typography>
            <Typography variant="h5" component="div">
              Pending at 100000km
            </Typography>
            <Button  >
                <Typography>
                    Remove
                </Typography>
            </Button>
          </CardContent></Item>
        </Grid>
        <Grid item xs={4}>
          <Item> <CardContent style={cardStyle}>
            <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
              Under Carriage wash
            </Typography>
            <Typography variant="h5" component="div">
              Pending at 100000km
            </Typography>
           
          </CardContent></Item>
        </Grid>
      </Grid>
    </div>
  )
}

export default OnGoingServices
