import { React, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Switch, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/common.css";
import { AppRoutes } from "./AppRoutes/Approutes";
import Sidenav from "./Components/Side Nav/sideNav";
import Header from "../src/Components/Header-Component/headerComponent";
import Footer from "./Components/Footer-Component/footerComponent";
import { menus } from "../src/Data/SideBarData";


function App() {




  const location = useLocation();
  const [userRole, setUserRole] = useState('');
  let routes = [];

  Object.keys(AppRoutes).forEach((key) => {
    routes.push(AppRoutes[key]);
  });

  // Function to check if the current location matches certain paths
  const shouldShowSidebar = () => {
    const { pathname } = location;
    return !['/login', '/signup'].includes(pathname);
  };

  useEffect(() => {
    const role = window.localStorage.getItem('user');
    setUserRole(JSON.parse(role));
  });

  const islogged = window.localStorage.getItem('IsLoggedIn');
  const sep_roles = userRole?.split(', ');
  const menuItems = menus.filter((subItem) => {
    for (let i = 0; i <= sep_roles?.length; i++) {
      console.log(i);
      console.log(sep_roles?.length);
      return islogged && subItem.allowedRoles.includes(sep_roles[i]);
    }

  });
  return (
    <div sx={{ backgroundColor: '#d3d3d3' }}>
      {shouldShowSidebar() && <Header />}
      <Box display="flex" className="App" sx={{ overflowX: 'hidden', paddingTop: 9, paddingX: 2, paddingBottom: 7, backgroundColor: '#f6f5f5', width: '100vw' }}>
        {shouldShowSidebar() && <Sidenav data={menuItems} />}
        <div>
          <Box className="App" sx={{}}>
            <Routes>
              {routes.map((route, i) => {
                return (
                  <Route key={i} path={route.path} element={route.component} />
                );
              })}
            </Routes>
          </Box>
          <Footer />
        </div>
      </Box>
    </div>
  );
}
export default App;
