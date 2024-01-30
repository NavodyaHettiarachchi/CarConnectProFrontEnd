import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/common.css";
import { AppRoutes } from "./AppRoutes/Approutes";
import Sidenav from "./Components/Side Nav/sideNav";
import Header from "../src/Components/Header-Component/headerComponent";
import Footer from "./Components/Footer-Component/footerComponent";
import { menus } from "../src/Data/SideBarData";

import AddClient from "./Components/Add-Clients/AddClient";
import ViewClientel from "./Components/Clientel-Component/ViewClientel";
import Inventory from "./Components/Inventory/Inventory";


function App() {
  const location = useLocation();
  let routes = [];

  Object.keys(AppRoutes).forEach((key) => {
    routes.push(AppRoutes[key]);
  });

  // Function to check if the current location matches certain paths
  const shouldShowSidebar = () => {
    const { pathname } = location;
    console.log(pathname);
    return !['/login', '/signup'].includes(pathname);
  };

  return (
    
    <div>
     
      <Box display="flex" className="App">
      {shouldShowSidebar() && <Sidenav data={menus} />}
      {shouldShowSidebar() && <Header  />}
        <Routes>
          {routes.map((route, i) => {
            return (
              
              <Route key={i} path={route.path} element={route.component} />
            );
          })}
        </Routes>
        <Footer/>
      </Box>
      </div>
  );
}

export default App;
