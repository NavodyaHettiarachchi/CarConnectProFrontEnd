import ViewClientel from "../Components/Clientel-Component/ViewClientel";
import OnGoingServices from "../Pages/OnGoingServices/OnGoingServices";
import RepairPage from "../Pages/Repairs/RepairPage";
import AddServicePage from "../Pages/AddService/AddService";
import Inventory from "../Components/Inventory/Inventory";
// import ViewClientsPage from "../Pages/ClientelPage/ViewClientsPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/Register/RegisterPage";
import CenterAdmin from "../Pages/CenterAdminPage/CenterAdminPage";
import Employees from "../Pages/EmployeePage/ViewEmployeePage";
import Vehicle from "../Pages/VehiclePage/Vehicle";
import Feedback from "../Pages/FeedbackPage/Feedback";
import { useState } from "react";



export const AppRoutes={

    

    // "home": { path: "/", component: (islogged?  null: <Feedback/> )},
    "login": { path: "/login", component: <LoginPage />},
    "signup":{ path: "/signup", component: (<RegisterPage />)},
    "ongoing_services": { path: "/service/", component: (<OnGoingServices/>)},
    "repairs": { path: "/repairs/", component: (<RepairPage />)},
    "add_service": { path: "/addservice/", component: (<AddServicePage />)},
    "view_clients": { path: "/clientel/", component: (<ViewClientel />)},
    "inventory": { path: "/inventory", component: <Inventory /> },
    "admin": { path: "/admin", component: <CenterAdmin /> },
    "view_employee": { path: "/employee", component: <Employees /> },
    "view_vehicle": { path: "/vehicle", component: <Vehicle /> },
}
