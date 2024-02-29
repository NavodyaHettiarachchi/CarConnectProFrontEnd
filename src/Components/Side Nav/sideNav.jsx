import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import SideBarMenu from './SideBarMenu';



const drawerWidth = 240;

export default function ClippedDrawer({ data }) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          marginTop: 4,
          
        },
      }}
      variant="permanent"
      anchor="left"
    >
     
      <List>
        {data.map((item) => (<SideBarMenu name={item.name}  icon={item.icon} subMenu={item.subMenu} />))}
        
      </List>
    </Drawer>
  );
}
