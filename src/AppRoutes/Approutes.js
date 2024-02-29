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
import ServiceHome from "../Pages/ServiceHome/ServiceHome";

export const AppRoutes = {
  login: { path: "/login", component: <LoginPage /> },
  signup: { path: "/signup", component: <RegisterPage /> },
  ongoing_services: { path: "/center/service/", component: <OnGoingServices /> },
  repairs: { path: "/center/repairs/", component: <RepairPage /> },
  add_service: { path: "/center/addservice/", component: <AddServicePage /> },
  view_clients: { path: "/center/clientel/", component: <ViewClientel /> },
  inventory: { path: "/center/inventory", component: <Inventory /> },
  admin: { path: "/admin", component: <CenterAdmin /> },
  view_employee: { path: "/center/employee", component: <Employees /> },
  view_vehicle: { path: "/vehicle", component: <Vehicle /> },
  home: { path: "/", component: <ServiceHome /> },
};
