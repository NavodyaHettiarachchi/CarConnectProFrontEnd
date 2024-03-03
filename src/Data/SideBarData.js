import React from 'react'
import {
  PersonOutline,
} from "@mui/icons-material";

import { AppRoutes as Routes } from "../AppRoutes/Approutes";

export const menus = [
  

  {
    key: 1,
    name: "Services",
    icon: <PersonOutline />,
    allowedRoles: ["mv:ad","s:ad"],
    subMenu: [
      {
        key: 1.1,
        name: "On going services",
        path: Routes.ongoing_services.path,
        component: Routes.ongoing_services.component,
      },
      {
        key: 1.2,
        name: "Repairs",
        path: Routes.repairs.path,
        component: Routes.repairs.component,
      },
      {
        key: 1.3,
        name: "Add Service",
        path: Routes.add_service.path,
        component: Routes.add_service.component,
      },
    ],
  },

  {
    key: 2,
    name: "Clientel",
    icon: <PersonOutline />,
    allowedRoles: ["cv:ad","cv:v","s:ad"],
    subMenu: [
      {
        key: 2.1,
        name: "View clients",
        path: Routes.view_clients.path,
        component: Routes.view_clients.component,
      },
      {
        key: 2.2,
        name: "Edit Clients",
        path: Routes.repairs.path,
        component: Routes.repairs.component,
      },
    ],
  },
  {
    key: 3,
    name: "Inventory",
    icon: <PersonOutline />,
    allowedRoles: ["mv:ad","s:ad"],
    subMenu: [
      {
        key: 3.1,
        name: "View Inventory",
        path: Routes.inventory.path,
        component: Routes.inventory.component,
      },
    ],
  },
  {
    key: 4,
    name: "Center-Admin",
    // name: "Employee",
    icon: <PersonOutline />,
    allowedRoles: ["s:ad"],
    subMenu: [
      {
        key: 4.1,
        name: "Add Role",
        path: Routes.admin.path,
        component: Routes.admin.component,
      },
      {
        key: 4.2,
        name: "View Employees",
        path: Routes.view_employee.path,
        component: Routes.view_employee.component,
      },
    ],
  },
  {
    key: 5,
    name: "Vehicles",
    icon: <PersonOutline />,
    allowedRoles: ["mv:ad"],
    subMenu: [
      {
        key: 5.1,
        name: "My vehicles",
        path: Routes.view_vehicle.path,
        component: Routes.view_vehicle.component,
      },
    ],
  },
];