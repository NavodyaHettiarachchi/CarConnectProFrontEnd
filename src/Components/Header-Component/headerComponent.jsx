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
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import LogoutConfirmation from '../../Pages/Profile/LogoutConfirmation';

export default function Header({ Role }) {
 
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [rolePerms, setRolePerms] = useState(false);
  const [openNotifs, setOpenNotifs] = useState(false);
  const [notifData, setNotifData] = useState([]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openNotifD = () => {
    setOpenNotifs(true);
  };

  const handleNotifClose = () => {
    setOpenNotifs(false);
  };

  useEffect(() => {
    console.log('Custom update event received');
    // Perform actions to re-run useEffect
    const roles = JSON.parse(window.sessionStorage.getItem('roles'));
    const found = roles.split(", ").some((role) => role === 'ip:v' || role === 'ip:ad' || role === 's:ad');
    if (found) {
      setRolePerms(true);
      getNotifications();
    } else {
      setRolePerms(false);
    }
    const handleCustomUpdate = () => {
      console.log('Custom update event received');
      // Perform actions to re-run useEffect
      const roles = JSON.parse(window.sessionStorage.getItem('roles'));
      const found = roles.split(", ").some((role) => role === 'ip:v' || role === 'ip:ad' || role === 's:ad');
      if (found) {
        setRolePerms(true);
        getNotifications();
      } else {
        setRolePerms(false);
      }
    };

    // Listen for custom event
    document.addEventListener('customUpdateEvent', handleCustomUpdate);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('customUpdateEvent', handleCustomUpdate);
    };

  }, []);

  const getNotifications = async () => {
    fetch("http://localhost:5000/center/inventorys/reorder", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        schema: JSON.parse(window.sessionStorage.getItem('schema')),
      })
    }).then((res) => res.json())
      .then((data) => { 
        console.log('data ', data.data);
        setNotifData(data.data.parts);
        console.log(' notif', notifData);
      }).catch((error => { console.log(error) }));
  };

  const handleOpenLogoutConfirmation = () => {
    handleClose();
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    // Perform logout actions here
    window.sessionStorage.removeItem('user');
    window.sessionStorage.removeItem('IsLoggedIn');
    window.sessionStorage.removeItem('schema');
    window.sessionStorage.removeItem('roles');
    window.sessionStorage.removeItem('userId');
    window.sessionStorage.removeItem('userType');
    // window.location.href = '/login';
    setShowLogoutConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const getNotificationSummary = () => {
    if (rolePerms) { 
      return 'So many makes me wet';
    }
    return 'Dry as the sahara';
  };

  return (
    <Box sx={{ flexGrow: 2 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ background: '#7758D1' }} className="header">
        <Toolbar style={{ marginTop: '-5px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,marginBottom:2}}>
            CarConnectPro
          </Typography>
          {auth && (
            <div style={{marginBottom:14}}  >
              <Tooltip  title={getNotificationSummary()}>
                <IconButton  sx={{ flexGrow: 1}}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={openNotifD}
                  color="inherit"
                >
                  <NotificationsNoneIcon  />
                  {notifData.length > 0 && (
                    <Badge badgeContent={notifData.length}   color="secondary">
                      {/* <span style={{ marginLeft: '4px' }}>{notifData.length}</span> */}
                    </Badge >
                  )}
                </IconButton>
              </Tooltip>
              <Menu 
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={openNotifs}
                onClose={handleNotifClose}
              >
                <div style={{ padding: '8px', minWidth: '200px' }}>
                  {notifData.map((notif, index) => (
                    <div key={index} style={{ marginBottom: '8px' }}>
                      <Typography variant="body1">
                        Stocks low: {notif.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Remaining: {notif.quantity}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Menu>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleOpenLogoutConfirmation} sx={{ justifyContent: 'center' }}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {showLogoutConfirmation && <LogoutConfirmation onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />}
    </Box>
  );
}