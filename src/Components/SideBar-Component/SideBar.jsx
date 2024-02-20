import React from "react";
import { useState } from 'react';

import { AccountCircle,Search,Explore,LogoutRounded,AddRounded,Circle} from "@mui/icons-material";
import { Avatar } from '@mui/material';
import {Grid,styled,IconButton} from "@mui/material";

import "./SideBar.css"
import Theme from "./Theme";
//import logo from '../../Images/logo.png';

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>



const theme2=Theme();

const CommonAvatarStyles = {
  width: 25,
  height: 25,
  color: 'white',
  backgroundImage: theme2.palette.backgroundGradient.main,
  border: theme2.palette.border.border3,
};

const CommonCircleStyles={
  width:10, 
  height:10,
};

const IconStyles = {
  width: 18,
  height: 18,
};

const StyledIconButton = styled(IconButton)({
  '&:hover': {
    color:theme2.palette.ternary.main, // Change to desired hover color
  },
});

const SideBar = () => {

  const [defaultColor] = useState('#D9D9D9'); //default color

    return (

      <div className="sideBar">


      <Grid container direction="column" spacing={0.1} alignItems="center">

      {/* Circle components */}

      <Grid item className="profile">
        <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
      
        <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
     
        <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
      </Grid>

      {/* Image component */}
      {/* <Grid item alignItems="center">
        <img src={logo} alt="Logo" width={'45px'} height={'45px'} />
      </Grid>    sx={{ mt:5}}  */}

      {/* Avatar components */}
      <Grid item >  
        <StyledIconButton>
          <Avatar sx={{ ...CommonAvatarStyles }}><Search sx={{ ...IconStyles }}/></Avatar>
        </StyledIconButton>
      </Grid>

      <Grid item>
        <StyledIconButton>
          <Avatar sx={{ ...CommonAvatarStyles }}><Explore sx={{ ...IconStyles }}/></Avatar>
          </StyledIconButton>
      </Grid>

      <Grid item>
        <StyledIconButton>
          <Avatar sx={{ ...CommonAvatarStyles }}><LogoutRounded sx={{ ...IconStyles }}/></Avatar>
        </StyledIconButton>
      </Grid>

      <Grid item>
        <StyledIconButton>
          <Avatar sx={{ ...CommonAvatarStyles }}><AddRounded sx={{ ...IconStyles }}/></Avatar>
        </StyledIconButton>
      </Grid>

      <Grid item sx={{ mt: 38 }} className="profile">
        <StyledIconButton >
          <Avatar sx={{ ...CommonAvatarStyles }}><AccountCircle sx={{ ...IconStyles }} /></Avatar>
        </StyledIconButton>
      </Grid>

    </Grid>

      <div className="head">

          <div>
            <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
            
            <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
        
            <Circle sx={{ ...CommonCircleStyles, Color: defaultColor }} />
          </div>

          <div>
              <StyledIconButton >
                <Avatar sx={{ ...CommonAvatarStyles }}><AccountCircle sx={{ ...IconStyles }} /></Avatar>
              </StyledIconButton>
          </div>
      </div>

  </div>
   
    )
   
   }
   
   export default SideBar