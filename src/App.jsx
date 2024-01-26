import React from "react";
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/common.css';
import {AppRoutes} from './AppRoutes/Approutes';
import Sidenav from './Components/Side Nav/sideNav';
import Header from '../src/Components/Header-Component/headerComponent';
import { menus } from "../src/Data/SideBarData";


function App() {
  let routes = [];

  Object.keys(AppRoutes).forEach((key) => { 
      routes.push( AppRoutes[key] );
  } )
  return (
    <Router>
        <Box display='flex' className="App">
            {/* <Header/> */}
            <Sidenav data={menus} />
            <Routes>
                {
                    routes.map((route, i) => {
                        return (
                            <Route key={i} path={route.path} element={route.component} />
                        )
                    })
                }
            </Routes>
        </Box>
    </Router>
);

} 

export default App;
