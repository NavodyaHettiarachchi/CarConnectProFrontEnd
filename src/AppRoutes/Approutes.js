import AddClient from "../Components/Add-Clients/AddClient";
import ViewClientel from "../Components/Clientel-Component/ViewClientel";
import OnGoingServices from "../Pages/OnGoingServices/OnGoingServices";
import RepairPage from "../Pages/Repairs/RepairPage";

export const AppRoutes = {
  ongoing_services: { path: "/services/", component: <OnGoingServices /> },
  repairs: { path: "/repairs/", component: <RepairPage /> },
  add_client: { path: "/add_client/", component: <AddClient /> },
  view_client: { path: "/client/", component: <ViewClientel /> },
};
