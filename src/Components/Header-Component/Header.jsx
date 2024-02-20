import React from 'react';
import './Header.css'; // Import your CSS file for styling
import Search from './Searchbox';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
<meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

const Header =({click})=>{
    return(
        <div>
              <div className="header" >
                <MenuIcon className='menu' onClick={click}/>
                <Search />
                <NotificationsIcon className='noti'/>
               
            </div>
        </div>
    )
}

export default Header;