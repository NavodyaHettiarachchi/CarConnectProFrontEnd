import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SideBarMenu({ name, icon, subMenu }) {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        setOpen(!open);
    };

    const handlehomedrop=()=>{
        if(name.includes("Home"||"home")){
            console.log("true");
            return false;
        }
    }

    return (
        <>
            <ListItemButton onClick={handleClick} selected={open}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={name} />
                {open &&  handlehomedrop() ?   <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        subMenu.map((subItem) => (
                            <ListItemButton onClick={() => (navigate(subItem.path))} selected={location.pathname === subItem.path}>
                                <ListItemText primary={subItem.name} />
                            </ListItemButton>
                        ))
                    }
                </List>
            </Collapse>
        </>
    );
}


// export default function SideBarMenu( {name, icon, subMenu } ) {
//     const [open, setOpen] = useState(false);

//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleClick = () => {
//         setOpen(!open);
//     };

//     return (
//         <>
//             <ListItemButton onClick={handleClick} selected={open}>
//                 <ListItemIcon>
//                     {icon}
//                 </ListItemIcon>
//                 <ListItemText primary={name} />
//                 {open ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>
//             <Collapse in={open} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                     {
//                         subMenu.map((subItem) => (
//                             <ListItemButton onClick={() => (navigate(subItem.path))} selected={location.pathname === subItem.path}>
//                                 <ListItemText primary={subItem.name} />
//                             </ListItemButton> 
//                         ))
//                     }
//                 </List>
//             </Collapse>
//         </>
//     );
// }