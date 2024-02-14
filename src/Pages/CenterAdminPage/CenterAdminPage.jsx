import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';

function CenterAdminPage() {
  return (
    <div>
      <Card sx={{ minWidth: 370 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            <b>Roles</b>
          </Typography>
          <Grid container spacing={2}>
            <Grid sx={{ fontSize: 15 }} item xs={9}>
              Role 1
            </Grid>
            <Grid item xs={1} >
              <IconButton aria-label="edit">
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Grid>
            <Grid item xs={1} sx={{ marginLeft: 2 }}>
              <IconButton aria-label="delete">
                <DeleteOutlinedIcon></DeleteOutlinedIcon>
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card> 
    </div>
  )
}

export default CenterAdminPage;