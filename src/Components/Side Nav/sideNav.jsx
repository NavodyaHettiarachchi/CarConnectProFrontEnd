import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Header from '../Header-Component/headerComponent';
import Footer from '../Footer-Component/footerComponent';
import Card from '../../Components/Card-Component/Cardnew';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Data from '@mui/material/Grid';
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
