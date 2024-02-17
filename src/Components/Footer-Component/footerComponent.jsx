
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function Footer() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background: '#f5f3f3e3', height: '40px', color: '#000' }} sx={{ top: 'auto', bottom: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }} className="footer center-text" >
        <Toolbar style={{  textAlign: 'center'  }}>
          <p>
            &copy; 2023 Car Connect Pro | All Rights Reserved. Designed, Built & Maintained by Group 5
          </p>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
