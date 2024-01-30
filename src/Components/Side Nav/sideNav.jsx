import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import SideBarMenu from './SideBarMenu';



const drawerWidth = 240;

export default function ClippedDrawer({ data }) {
  return (

    // <Box sx={{ display: 'flex' }}>
    //   <CssBaseline />
    //   <Drawer
    //     variant="permanent"
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    //     }}
    //   >
    //     <Toolbar />
    //     <Box sx={{ overflow: 'auto' }}>
    //       <List>
    //         {['Dashboard', 'Clientele', 'On going Services', 'Repairs'].map((text, index) => (
    //           <ListItem key={text} disablePadding>
    //             <ListItemButton>
    //               <ListItemIcon>
    //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //               </ListItemIcon>
    //               <ListItemText primary={text} />
    //             </ListItemButton>
    //           </ListItem>
    //         ))}
    //       </List>
    //       <Divider />

    //     </Box>
    //   </Drawer>

    //   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

    //   </Box>
    //   <Footer />

    // </Box>
    
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          marginTop:5
        },
      }}
      variant="permanent"
      anchor="left"
    >
     
      <List>
        {data.map((item) => (<SideBarMenu name={item.name} icon={item.icon} subMenu={item.subMenu} />))}
        
      </List>
    </Drawer>
  );
}
