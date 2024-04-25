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
import Alert from '@mui/material/Alert';

export default function Header({ Role }) {
 
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [rolePerms, setRolePerms] = useState(false);
  const [openNotifs, setOpenNotifs] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [notifData, setNotifData] = useState([]);
  const [isCenter, setIsCenter] = useState(false);

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
    const userType = JSON.parse(window.sessionStorage.getItem('userType'));
    switch (userType) {
      case 'center':
        const roles = JSON.parse(window.sessionStorage.getItem('roles'));
        const found = roles.split(", ").some((role) => role === 'ip:v' || role === 'ip:ad' || role === 's:ad');
        if (found) {
          setRolePerms(true);
          setIsCenter(true);
          getNotifications();
        } else {
          setRolePerms(false);
        }
        break;
      case 'owner':
        const userId = JSON.parse(window.sessionStorage.getItem('user')).id;
        setRolePerms(true);
        setIsCenter(false);
        getServiceNotifs(userId);
        break;
      default:
        break;
    };
    // Perform actions to re-run useEffect
    const handleCustomUpdate = () => {
      console.log('Custom update event received');
      // Perform actions to re-run useEffect
      const userType = JSON.parse(window.sessionStorage.getItem('userType'));
      switch (userType) { 
        case 'center':
          const roles = JSON.parse(window.sessionStorage.getItem('roles'));
          const found = roles.split(", ").some((role) => role === 'ip:v' || role === 'ip:ad' || role === 's:ad');
          if (found) {
            setRolePerms(true);
            setIsCenter(true);
            getNotifications();
          } else {
            setRolePerms(false);
          }
          break;
        case 'owner':
          const userId = JSON.parse(window.sessionStorage.getItem('user')).id;
          setRolePerms(true);
          setIsCenter(false);
          getServiceNotifs(userId);
          break;
        default:
          break;
      };
    };

    // Listen for custom event
    document.addEventListener('customUpdateEvent', handleCustomUpdate);
    // Clean up event listener
    return () => {
      document.removeEventListener('customUpdateEvent', handleCustomUpdate);
    };

  }, []);

  const getServiceNotifs = async (ownerId) => {
    fetch(`http://localhost:5000/owner/notifs/${ownerId}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
    }).then((res) => res.json())
      .then((data) => {
        const currentDate = new Date();
        setServiceData(data.data.vehicleNotifs.map((notif) => {
          const lastServiceDate = new Date(notif.last_service_date);
          const monthsSinceLastService = (currentDate.getFullYear() - lastServiceDate.getFullYear()) * 12 + currentDate.getMonth() - lastServiceDate.getMonth();
          const isOverdue = monthsSinceLastService >= 5;
          return {
            ...notif,
            last_service_date: notif.last_service_date.split('T')[0],
            is_overdue: isOverdue
          };
        }));
      }).catch((error) => { console.log(error) });
  };


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
        setNotifData(data.data.parts);
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
      if (isCenter) {
        if (notifData.length > 0) {
          return notifData.length;
        }
      } else { 
        if (serviceData.length > 0) { 
          return serviceData.length;
        }
      }
    }
    return 'No notifications';
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

                  <NotificationsNoneIcon />
                  {(notifData.length || serviceData.length) > 0 && (
                    <Badge badgeContent={isCenter ? notifData.length : serviceData.filter((service) => service.isDue).length} color="secondary">
                    </Badge>

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
                  {isCenter ? notifData.map((notif, index) => (
                    <Alert severity="warning">
                      <div key={index} style={{ marginBottom: '8px' }}>
                        <Typography variant="body1">
                          Stocks low: {notif.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Remaining: {notif.quantity}
                        </Typography>
                      </div>
                    </Alert>
                  )) : serviceData.filter((service) => service.isDue).map((notif, index) => ( 
                    <Alert severity="warning">
                      <div key={index} style={{ marginBottom: '8px' }}>
                        <Typography variant="body1">
                          Upcoming service for: {notif.number_plate}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Last service date: {notif.last_service_date}
                        </Typography>
                      </div>
                    </Alert>
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