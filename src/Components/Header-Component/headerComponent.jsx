import * as React from 'react';
import { useState } from 'react';
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
import LogoutConfirmation from '../../Pages/Profile/LogoutConfirmation';
import { Link } from 'react-router-dom';

export default function Header({ Role }) {
 
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLogoutConfirmation = () => {
    handleClose();
    setShowLogoutConfirmation(true);
  };

  const handleProfileClick = () => {
    handleClose();
  };

  const handleConfirmLogout = () => {
    // Perform logout actions here
    // For example, redirect to logout endpoint
    setShowLogoutConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style={{ background: '#7758D1' }} className="header">
        <Toolbar style={{ marginTop: '-5px' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CarConnectPro
          </Typography>
          {auth && (
            <div>
              <Tooltip title="No notifications">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <NotificationsNoneIcon />
                </IconButton>
              </Tooltip>
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
                <MenuItem
                  component={Link} 
                  to={`/${Role}/profile`}
                  onClick={handleProfileClick}
                  sx={{ justifyContent: 'center' }}
                >
                  Profile
                </MenuItem>

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
