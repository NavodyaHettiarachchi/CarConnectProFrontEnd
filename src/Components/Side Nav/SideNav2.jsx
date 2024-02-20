import React from 'react';
import "./SideNav.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowIcon from '@mui/icons-material/ArrowCircleLeft';
import HomeIcon from '@mui/icons-material/Home';
import SerIcon from '@mui/icons-material/MiscellaneousServices';
import VehiIcon from '@mui/icons-material/DriveEta';
import DocIcon from '@mui/icons-material/Description';
import RepIcon from '@mui/icons-material/Build';

<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>


const SideNav =({open,click})=>{
    return(
        <div>
             <div className={open?"sideNav collapse":"sideNav"}>

                <div className='head'>
                    <h2>Explore<ArrowIcon  onClick={click} className='style'/></h2>
                </div>   
             
                <ul> 
                    <li><HomeIcon className='icon'/>Home</li>
                    <li><RepIcon className='icon'/>Reapirs</li>
                    <li><SerIcon className='icon'/>Services</li>
                    <li><DocIcon className='icon'/>Documents</li>
                    <li><VehiIcon className='icon'/>My Vehicle</li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav;