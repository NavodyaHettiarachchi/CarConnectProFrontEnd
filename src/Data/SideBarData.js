import React from 'react';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import { AppRoutes as Routes } from "../AppRoutes/Approutes";

export const menu = [
  {
    key: 1,
    name: "Services",
    icon: <GarageOutlinedIcon />,
    allowedRoles: ["s:ad", "os:v", "os:ad"],
    path: Routes.ongoing_services.path,
    component: Routes.ongoing_services.component,
  }, 
  {
    key: 2,
    name: "Repairs",
    icon: <CarRepairOutlinedIcon />,
    allowedRoles: ["s:ad", "or:v", "or:ad"],
    path: Routes.repairs.path,
    component: Routes.repairs.component,
  },
  {
    key: 3,
    name: "Clientele",
    icon: <DriveEtaOutlinedIcon />,
    allowedRoles: ["s:ad", "cp:v", "cp:ad"],
    path: Routes.view_clients.path,
    component: Routes.view_clients.component,
  },
  {
    key: 4,
    name: "Inventory",
    icon: <Inventory2OutlinedIcon />,
    allowedRoles: ["s:ad", "ip:v", "ip:ad"],
    path: Routes.inventory.path,
    component: Routes.inventory.component,
  },
  {
    key: 5,
    name: "Employee",
    icon: <PeopleOutlinedIcon />,
    allowedRoles: ["s:ad", "ep:v", "ep:ad"],
    path: Routes.view_employee.path,
    component: Routes.view_employee.component,
  },
  {
    key: 6,
    name: "Settings",
    icon: <SettingsOutlinedIcon />,
    allowedRoles: ["s:ad", "sp:v", "sp:ad"],
    path: Routes.admin.path,
    component: Routes.admin.component,
  },
  {
    key: 7,
    name: "My Vehicles",
    icon: <DirectionsCarFilledOutlinedIcon />,
    allowedRoles: ["mv:ad"],
    path: Routes.view_vehicle.path,
    component: Routes.view_vehicle.component,
  }
];
