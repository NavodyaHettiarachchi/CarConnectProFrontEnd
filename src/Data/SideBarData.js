import {
  PersonOutline,
  Person2Outlined,
  Shop2Outlined,
  WorkOutline,
  HelpCenterOutlined,HomeMaxOutlined
} from "@mui/icons-material";

import { AppRoutes as Routes } from "../AppRoutes/Approutes";

export const menus = [
  {
    name: "Home",
    icon: <HomeMaxOutlined/>,
    subMenu: [
     
    ],
  },
  {
    name: "Services",
    icon: <PersonOutline />,
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
    ],
  },
  
  {
    name: "Clientel",
    icon: <PersonOutline />,
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

    subMenu: [
      {
        name: "View Inventory",
        path: Routes.inventory.path,
        component: Routes.inventory.component,
      },
    ],
  },
];
