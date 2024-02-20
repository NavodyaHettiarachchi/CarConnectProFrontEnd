import React, { useState } from "react";
//import { Box } from "@mui/material";
//import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "./css/common.css";
//import { AppRoutes } from "./AppRoutes/Approutes";
//import Sidenav from "./Components/Side Nav/sideNav";
//import Header from "../src/Components/Header-Component/headerComponent";
import Header  from "./Components/SideBar-Component/Header"
import Footer from "./Components/Footer-Component/footerComponent";
import SideBar from "./Components/SideBar-Component/SideBar";
import SideNav from "./Components/SideBar-Component/SideNav";
import Backdrop from "./Components/SideBar-Component/Backdrop";
import Home from "./Components/SideBar-Component/Home";
//import UserProfile from "./Components/SideBar-Component/UserProfile";
//import { menus } from "../src/Data/SideBarData";

//function App() {
  // const location = useLocation();
  // let routes = [];

  // Object.keys(AppRoutes).forEach((key) => {
  //   routes.push(AppRoutes[key]);
  // });

  // // Function to check if the current location matches certain paths
  // const shouldShowSidebar = () => {
  //   const { pathname } = location;
  //   console.log(pathname);
  //   return !['/login', '/signup'].includes(pathname);
  // };
  // // user role has to be extracted from login
  // const userRole = "admin"; // Example role

  // const menuItems = menus.filter((subItem) => {
  //   // Replace 'admin' with the role that should have access to this menu item
  //   return subItem.allowedRoles.includes(userRole);
  // });

  const App = () => {
      const[open,setOpen]=useState(false);

      const handleClickOpen=()=>{
        setOpen(true);
      };

      const handleClickClose=()=>{
        setOpen(false);
      };

    return(

      <div>
        <Header click={handleClickOpen}/>
        {/* <Backdrop open={open}/> */}
        {/* <Home/> */}
        <SideNav open={open} click={handleClickClose}/>
        <SideBar />
        <Footer/>
      </div>
    )
          
  };
  

 // return (

    
    // <div sx={{ backgroundColor: '#d3d3d3'}}>
    //   {shouldShowSidebar() && <Header />}
    //   <Box display="flex" className="App" sx={{ paddingTop: 9, paddingX: 2, paddingBottom: 7, backgroundColor: '#f6f5f5', width: '100vw' }}>
    //   {shouldShowSidebar() && <Sidenav data={menuItems} />}
      

    // <div>

    //   <Box display="flex" className="App">

    

    //     <Routes>
    //       {routes.map((route, i) => {
    //         return (
    //           <Route key={i} path={route.path} element={route.component} />
    //         );
    //       })}
    //     </Routes>
    
    //   </Box>
    //   <SideBar/>
    //   <Footer />
    //   </div>
      
    //   </Box>
    // </div>

   
//   );

// }

export default App;
