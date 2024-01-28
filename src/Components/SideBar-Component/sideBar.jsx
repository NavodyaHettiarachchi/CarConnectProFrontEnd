import React from "react";
import { useState } from 'react';


import "./sideBar.css"

import { AccountCircle,Search,Explore,LogoutRounded,AddRounded,Circle} from "@mui/icons-material";
import { Avatar } from '@mui/material';
import {Grid,Item} from "@mui/material";

import Theme from "../Common/Theme";
import logoSmall from '../../Images/logoSmall.png';



const theme2=Theme();

const CommonAvatarStyles = {
  width: 40,
  height: 40,
  color: 'white',
  backgroundImage: theme2.palette.backgroundGradient.main,
  border: theme2.palette.border.border3,
};

const CommonCircleStyles={
  width:10, 
  height: 10,
};


 

const SideBar = () => {

  const [defaultColor, setDefaultColor] = useState('#7B1646'); //default color

    return (

      <div className="sideBar">



<Grid container direction="column" spacing={1.5} alignItems="center">

      {/* Circle components */}

      <Grid item>
        <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
      
        <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
     
        <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
      </Grid>

      {/* Image component */}
      <Grid item>
        <img src={logoSmall} alt="Logo" />
      </Grid>

      {/* Avatar components */}
      <Grid item sx={{ mt:8}}>
        <Avatar sx={{ ...CommonAvatarStyles }}><Search/></Avatar>
      </Grid>

      <Grid item>
        <Avatar sx={{ ...CommonAvatarStyles }}><Explore/></Avatar>
      </Grid>

      <Grid item>
        <Avatar sx={{ ...CommonAvatarStyles }}><LogoutRounded/></Avatar>
      </Grid>

      <Grid item>
        <Avatar sx={{ ...CommonAvatarStyles }}><AddRounded/></Avatar>
      </Grid>

      <Grid item sx={{ mt: 40 }}>
        <Avatar sx={{ ...CommonAvatarStyles }}><AccountCircle/></Avatar>
      </Grid>

    </Grid>

  </div>
   
    )
   
   }
   
   export default SideBar