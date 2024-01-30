import OnGoingServices from "../Pages/OnGoingServices/OnGoingServices";
import RepairPage from "../Pages/Repairs/RepairPage";
import AddServicePage from "../Pages/AddService/AddService";

export const AppRoutes={
    "ongoing_services": { path: "/service/", component: (<OnGoingServices type="admin" />)},
    "repairs": { path: "/repairs/", component: (<RepairPage />)},
    "add_service": { path: "/addservice/", component: (<AddServicePage />)}
}                 