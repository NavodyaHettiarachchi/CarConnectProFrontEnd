import {
  PersonOutline,
  Person2Outlined,
  Shop2Outlined,
  WorkOutline,
  HelpCenterOutlined,
} from "@mui/icons-material";

import { AppRoutes as Routes } from "../AppRoutes/Approutes";

export const menus = [
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
    name: "Vehicles",
    icon: <PersonOutline />,
    subMenu: [
      {
        name: "Edit Vehicle",
        path: Routes.ongoing_services.path,
        component: Routes.ongoing_services.component,
      },
    ],
  },
  {
    name: "Clientel",
    icon: <PersonOutline />,
    subMenu: [
      {
        name: "View clients",
        path: Routes.view_client.path,
        component: Routes.view_client.component,
      },
      {
        name: "Add Clients",
        path: Routes.add_client.path,
        component: Routes.add_client.component,
      },
      {
        name: "Edit Clients",
        path: Routes.repairs.path,
        component: Routes.repairs.component,
      },
    ],
  },
];
