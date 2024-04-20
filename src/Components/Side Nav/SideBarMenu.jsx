import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SideBarMenu({ index, name, icon, path }) {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <ListItemButton
        key={index}
        onClick={() => navigate(path)}
        selected={location.pathname === path}
      >
        <ListItemIcon style={{ color: location.pathname === path ? 'purple' : 'inherit' }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={name}
          style={{ color: location.pathname === path ? 'purple' : 'inherit' }}
        />
      </ListItemButton>
    </>
  );
}