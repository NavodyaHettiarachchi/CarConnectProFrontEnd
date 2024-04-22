import React, { useState } from 'react';
import './LoginStyles.css';
import landingimg from '../../../src/Images/sidelogin.jpg';
import Minilogo from '../../../src/Images/sidelogin.svg';
import Heading from '../Page-Header/header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setError(null);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await axios.post('http://localhost:5000/login/', { username, password });
      if (response.status === 200) {
        const loginData = response.data.data;
        navigate('/');
        window.sessionStorage.setItem('schema', JSON.stringify(loginData.schema));
        window.sessionStorage.setItem('roles', JSON.stringify(loginData.user.roles));
        window.sessionStorage.setItem('IsLoggedIn', true);
        window.sessionStorage.setItem('userId', JSON.stringify(loginData.user.id));
        window.sessionStorage.setItem('user', JSON.stringify(loginData.user));
        window.sessionStorage.setItem('userType', JSON.stringify(loginData.roleType));//@Harindu
        let roles = loginData.user.roles.split(', ');
        const found = roles.filter((role) => role === 'mv:ad');
        if (found.length > 0) {
          navigate('/vehicle');
        } else {
          const isAdmin = roles.filter((role) => role === 's:ad' || role === 'sp:ad' || role === 'sp:v');
          if (isAdmin.length > 0) {
            navigate('/dashboard');
          } else { 
            navigate('/service/');
          }
        }
      } else {
        alert("Invalid Credentials");
        window.sessionStorage.setItem('IsLoggedIn', false);
      }
    } catch (e) {
      console.log('fuck', e);
      setError(e.response.data.message ? e.response.data.message : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className='hero-landing-login'>
      {error &&
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          message={error}
        >
          <Alert severity="error">
            {error}
          </Alert>
        </Snackbar>
      }
      <div className='hero-img'>
        <img src={landingimg} alt="" />
      </div>
      <div className="hero-form module-border-wrap" style={{position: 'relative'}}>
        <div className='module' >
          <img src={Minilogo} alt="" />
          <Heading title="Welcome to Car Connect Pro" />
          <form className='form-container' onSubmit={handleSubmit}>
            <label htmlFor="" className='left-aligned'>Enter your Email</label>
            <br />
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} className='name-field ' />
            <br />
            <label htmlFor="" className=' left-aligned top-spacer'>Enter your Password</label>
            <br />
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} className='name-field ' />
            <br />
            {/* <span className='left-aligned'>
              <div>
                <input type="checkbox" name="remember-me" className='top-spacer checkbox' id="" />
                <label className='top-spacer checkbox' htmlFor="remember-me">Remember Me</label>
              </div>
              <div>
                <label htmlFor="" className='fgt-pwd top-spacer link-text'> Forgot password</label>
              </div>
            </span> */}
            <input className='sub-btn' onClick={handleSubmit} type="submit" value="LOGIN" />
            <br />
            <div className="signup-btn  top-spacer">Not a member? <a className='link-text' href="/signup">Signup</a></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
