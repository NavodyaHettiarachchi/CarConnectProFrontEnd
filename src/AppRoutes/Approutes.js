import ViewClientel from "../Components/Clientel-Component/ViewClientel";
import OnGoingServices from "../Pages/OnGoingServices/OnGoingServices";
import RepairPage from "../Pages/Repairs/RepairPage";
import AddServicePage from "../Pages/AddService/AddService";
import Inventory from "../Components/Inventory/Inventory";
// import ViewClientsPage from "../Pages/ClientelPage/ViewClientsPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/Register/RegisterPage";

export const AppRoutes={
   
    "login":{ path: "/login/", component: (<LoginPage />)},
    "signup":{ path: "/signup/", component: (<RegisterPage />)},
    "ongoing_services": { path: "/service/", component: (<OnGoingServices type="admin" />)},
    "repairs": { path: "/repairs/", component: (<RepairPage />)},
    "add_service": { path: "/addservice/", component: (<AddServicePage />)},
    "view_clients": { path: "/clientel/", component: (<ViewClientel />)},
    "inventory": { path: "/inventory", component: <Inventory /> }
}

