import React from 'react';
import { Button,Grid } from '@mui/material';
import './ChangePassword.css';
import { Link } from 'react-router-dom';
function LogoutConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div>
          <Grid container spacing={6} >
            <Grid item xs={6}>
                <Button  component={Link} to="/login" variant="contained" color="primary" onClick={onConfirm}>Confirm</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="secondary" onClick={onCancel} sx={{marginLeft:1}}>Cancel</Button>
            </Grid>
          </Grid>

        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmation;