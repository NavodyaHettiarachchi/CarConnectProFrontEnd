import React from 'react';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppRoutes as Routes } from "../AppRoutes/Approutes";

const getPath = () => {
  const userType = JSON.parse(window.sessionStorage.getItem('userType'));
  switch (userType) {
    case 'owner':
      return Routes['OwnerProfile'].path;
    case 'center':
      return Routes['CenterProfile'].path;
    case 'employee':
      return Routes['EmployeeProfile'].path;
    case 'admin':
      return Routes['AdminProfile'].path;
    default:
      return null;
  }
};

const getComponent = () => {
  const userType = JSON.parse(window.sessionStorage.getItem('userType'));
  switch (userType) {
    case 'owner':
      return Routes['OwnerProfile'].component;
    case 'center':
      return Routes['CenterProfile'].component;
    case 'employee':
      return Routes['EmployeeProfile'].component;
    case 'admin':
      return Routes['AdminProfile'].component;
    default:
      return null;
  }
};


export const menu = [
  {
    key: 0,
    name: "Dashboard",
    icon: <DashboardIcon />,
    allowedRoles: ["s:ad", "sp:ad", "sp:v"],
    path: Routes.home.path,
    component: Routes.home.component
  },
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
    allowedRoles: ["mv:v", "mv:ad"],
    path: Routes.view_vehicle.path,
    component: Routes.view_vehicle.component,
  },
  {
    key: 8,
    name: "Profile",
    icon: <AccountBoxOutlinedIcon />,
    allowedRoles: ["pp:v", "pp:ad", "s:ad"],
    path: getPath(),
    component: getComponent(),
  },
];


