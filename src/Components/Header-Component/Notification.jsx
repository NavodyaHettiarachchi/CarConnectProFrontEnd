import * as React from 'react';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import LogoutConfirmation from '../../Pages/Profile/LogoutConfirmation';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const Notification = () => {
  //for notification
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleCloseNotify = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <>
      <Tooltip title="Notification">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => {

            handleClick();
          }}
          color="inherit"
        >
          {/* <NotificationsNoneIcon /> */}
          <Badge badgeContent={5} color="error">
            <NotificationsNoneIcon />
          </Badge>

        </IconButton>
      </Tooltip>


      <Snackbar open={open} autoHideDuration={4000}

        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message="Notification"
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleCloseNotify}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Card variant="outlined">
          <CardContent>
            <Alert severity="success" onClose={handleCloseNotify}>This is a success Notification.</Alert>
            <Alert severity="info">This is an info Notification.</Alert>
            <Alert severity="warning">This is a warning Notification.</Alert>
            <Alert severity="error">This is an error Notification.</Alert>
          </CardContent>


        </Card>


      </Snackbar>

    </>
  )
}

export default Notification;
