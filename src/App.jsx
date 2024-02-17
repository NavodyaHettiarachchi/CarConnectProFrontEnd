import React from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/common.css";
import { AppRoutes } from "./AppRoutes/Approutes";
import Sidenav from "./Components/Side Nav/sideNav";
import Header from "../src/Components/Header-Component/headerComponent";
import Footer from "./Components/Footer-Component/footerComponent";
import { menus } from "../src/Data/SideBarData";


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

    
    <div sx={{ backgroundColor: '#d3d3d3'}}>
      {shouldShowSidebar() && <Header />}
      <Box display="flex" className="App" sx={{ paddingTop: 9, paddingX: 2, paddingBottom: 7, backgroundColor: '#f6f5f5', width: '100vw' }}>
      {shouldShowSidebar() && <Sidenav data={menus} />}
      

    <div>

      <Box display="flex" className="App">
        {shouldShowSidebar() && <Sidenav data={menus} />}
        {shouldShowSidebar() && <Header />}

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
        <Footer />
      </Box>
    </div>
  );
}

export default App;
