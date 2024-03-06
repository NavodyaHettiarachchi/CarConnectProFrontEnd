import React from 'react'
import {
  PersonOutline,
  HomeMaxOutlined
} from "@mui/icons-material";

import { AppRoutes as Routes } from "../AppRoutes/Approutes";

export const menus = [
  

  {
    name: "Services",
    icon: <PersonOutline />,
    allowedRoles: ["mv:ad","s:ad"],
    subMenu: [
      {
        name: "On going services",
        path: Routes.ongoing_services.path,
        component: Routes.ongoing_services.component,
      },
      {
        name: "Repairs",
        path: Routes.repairs.path,
        component: Routes.repairs.component,
      },
      {
        name: "Add Service",
        path: Routes.add_service.path,
        component: Routes.add_service.component,
      },
    ],
  },

  {
    name: "Clientel",
    icon: <PersonOutline />,
    allowedRoles: ["cv:ad","cv:v","s:ad","mv:ad"],
    subMenu: [
      {
        name: "View clients",
        path: Routes.view_clients.path,
        component: Routes.view_clients.component,
      },
      {
        name: "Edit Clients",
        path: Routes.repairs.path,
        component: Routes.repairs.component,
      },
    ],
  },
  {
    name: "Inventory",
    icon: <PersonOutline />,
    allowedRoles: ["mv:ad","s:ad"],
    subMenu: [
      {
        name: "View Inventory",
        path: Routes.inventory.path,
        component: Routes.inventory.component,
      },
    ],
  },
  {
    name: "Center-Admin",
    // name: "Employee",
    icon: <PersonOutline />,
    allowedRoles: ["s:ad"],
    subMenu: [
      {
        name: "Add Role",
        path: Routes.admin.path,
        component: Routes.admin.component,
      },
      {
        name: "View Employees",
        path: Routes.view_employee.path,
        component: Routes.view_employee.component,
      },
    ],
  },
  {
    name: "Vehicles",
    icon: <PersonOutline />,
    allowedRoles: ["mv:ad"],
    subMenu: [
      {
        name: "My vehicles",
        path: Routes.view_vehicle.path,
        component: Routes.view_vehicle.component,
      },
    ],
  },
];