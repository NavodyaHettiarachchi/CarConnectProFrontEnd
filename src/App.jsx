import  React from 'react';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Switch, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/common.css";
import { AppRoutes } from "./AppRoutes/Approutes";
import Sidenav from "./Components/Side Nav/sideNav";
import Header from "../src/Components/Header-Component/headerComponent";
import Footer from "./Components/Footer-Component/footerComponent";
import { menu } from "../src/Data/SideBarData";


function App() {
  const location = useLocation();
  const [userRole, setUserRole] = useState('');
  const [UserType, setUserType] = useState('');//@Harindu Ashen 
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
    const role = window.sessionStorage.getItem('roles');
    setUserRole(JSON.parse(role));

    const userType = window.sessionStorage.getItem('userType');//@Harindu Ashen 
    setUserType(JSON.parse(userType));
  },[]);

  // useEffect(() => {
  //   const userType = window.sessionStorage.getItem('userType');//@Harindu Ashen 
  //   setUserType(JSON.parse(userType));
  // },[]);  

  const islogged = window.sessionStorage.getItem('IsLoggedIn');
  const sep_roles = userRole?.split(', ');
  let menuItems = menu.filter((subItem) => {
    for (let i = 0; i <= sep_roles?.length; i++) {
      return islogged && subItem.allowedRoles.includes(sep_roles[i]);
    }
  });
  const center_type = JSON.parse(window.sessionStorage.getItem('user')).center_type;

  if (center_type && center_type !== "B") { 
    if (center_type === "S") { 
      menuItems = menuItems.filter((item) => {
        return item.key !== 2;
      })
    } else {
      menuItems = menuItems.filter((item) => {
        return item.key !== 1;
      })
    }
  }

  return (
    <div sx={shouldShowSidebar() ? { backgroundColor: '#d3d3d3' } : { backgroundColor: '#ffffff' }}>
      {shouldShowSidebar() && <Header Role={UserType}/>}
      <Box display="flex" className="App" sx={{ overflowX: 'hidden', paddingTop: 2, paddingX: 2, paddingBottom: 7, backgroundColor: '#ffffff' }}>
        {shouldShowSidebar() && <Sidenav menu={menuItems} />}
        <div>
          {/* <Box className="App" sx={{}}> */}
            <Routes>
              {routes.map((route, i) => {
                return (
                  <Route key={i} path={route.path} element={route.component} />
                );
              })}
            </Routes>
          {/* </Box> */}
          <Footer />
        </div>
      </Box>
    </div>
  );
}
export default App;
