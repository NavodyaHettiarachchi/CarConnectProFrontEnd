import OnGoingServices from "../Pages/OnGoingServices/OnGoingServices";

import RepairPage from "../Pages/Repairs/RepairPage";
import AddServicePage from "../Pages/AddService/AddService";

export const AppRoutes={
    "ongoing_services": { path: "/service/", component: (<OnGoingServices type="admin" />)},
    "repairs": { path: "/repairs/", component: (<RepairPage />)},
    "add_service": { path: "/addservice/", component: (<AddServicePage />)}

import ViewClientsPage from "../Pages/ClientelPage/ViewClientsPage";
import RepairPage from "../Pages/Repairs/RepairPage"

export const AppRoutes={
    "ongoing_services": { path: "/services/", component: (<OnGoingServices />)},
    "repairs": { path: "/repairs/", component: (<RepairPage />)},
    "view_clients": { path: "/clientel/", component: (<ViewClientsPage />)}

}                 