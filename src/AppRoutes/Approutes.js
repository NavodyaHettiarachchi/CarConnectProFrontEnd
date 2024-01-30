
import ViewClientel from "../Components/Clientel-Component/ViewClientel";
import OnGoingServices from "../Pages/OnGoingServices/OnGoingServices";
import RepairPage from "../Pages/Repairs/RepairPage";
import AddServicePage from "../Pages/AddService/AddService";
import ViewClientsPage from "../Pages/ClientelPage/ViewClientsPage";
import LoginPage from "../Pages/LoginPage/LoginPage";

export const AppRoutes={
   
    "login":{ path: "/login/", component: (<LoginPage />)},
    "ongoing_services": { path: "/service/", component: (<OnGoingServices type="admin" />)},
    "repairs": { path: "/repairs/", component: (<RepairPage />)},
    "add_service": { path: "/addservice/", component: (<AddServicePage />)},
    "view_clients": { path: "/clientel/", component: (<ViewClientsPage />)}
}
