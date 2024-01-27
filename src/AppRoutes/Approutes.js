import OnGoingServices from "../Pages/OnGoingServices/OnGoingServices";
import RepairPage from "../Pages/Repairs/RepairPage"

export const AppRoutes={
    "ongoing_services": { path: "/services/", component: (<OnGoingServices />)},
    "repairs": { path: "/repairs/", component: (<RepairPage />)}
}                 