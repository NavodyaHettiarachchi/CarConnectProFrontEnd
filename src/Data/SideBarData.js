import {
  PersonOutline,
 HomeMaxOutlined
} from "@mui/icons-material";

import { AppRoutes as Routes } from "../AppRoutes/Approutes";

export const menus = [
  {
    name: "Home",
    icon: <HomeMaxOutlined />,
    allowedRoles: ["user", "admin","service_provider"],
    subMenu: [
        
    ],
  },
  {
    name: "Services",
    icon: <PersonOutline />,
    allowedRoles: ["user","admin"],
    subMenu: [
      {
        name: "On going services",
       
        path: Routes.ongoing_services.path,
        component: Routes.ongoing_services.component,
      },
      {
        name: "Repairs",
        allowedRoles: ["admin"],
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
    allowedRoles: ["service_provider"],
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
    allowedRoles: ["admin"],
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
    name: "Employee",
    icon: <PersonOutline />,
    allowedRoles: ["admin"],
    subMenu: [
      {

        name: "Add Role",
        path: Routes.admin.path,
        component: Routes.admin.component,
        name: "View Employees",

        path: Routes.view_employee.path,
        component: Routes.view_employee.component,
      },
    ],
  },
  {
    name: "Vehicles",
    icon: <PersonOutline />,
    allowedRoles: ["user","admin"],
    subMenu: [
      {
        name: "My vehicles",
        path: Routes.view_vehicle.path,
        component: Routes.view_vehicle.component,
      },
    ],
  },
];
