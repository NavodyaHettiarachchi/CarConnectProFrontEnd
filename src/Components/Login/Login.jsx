import React, { useState } from 'react';
import './LoginStyles.css';
import landingimg from '../../../src/Images/sidelogin.jpg';
import Minilogo from '../../../src/Images/sidelogin.svg';
import Heading from '../Page-Header/header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const respone = await axios.post('http://localhost:5000/login/', {username, password});
      const loginData = respone.data.data.user.roles;
      window.localStorage.setItem('user', JSON.stringify(loginData));
      window.localStorage.setItem('IsLoggedIn', true);
      if (respone.status == 200) {
        navigate('/');
        const response = await axios.post('http://localhost:5000/login/', { username, password });
        const loginData = response.data.data;
        const schema = loginData.schema;
        window.sessionStorage.setItem('schema', JSON.stringify(schema));
        window.sessionStorage.setItem('roles', JSON.stringify(loginData.user.roles));
        window.sessionStorage.setItem('IsLoggedIn', true);
        window.sessionStorage.setItem('userId', loginData.user.id ? loginData.user.id : loginData.user.center_id);
        if (response.status === 200) {
          let roles = loginData.user.roles.split(', ');
          const found = roles.filter((role) => role === 'mv:ad');
          if (found.length > 0) {
            navigate('/vehicle');
          } else {
            navigate('/service/');
          }

        }
      } else {
        alert("Invalid Credentials");
        window.sessionStorage.setItem('IsLoggedIn', false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='hero-landing-login'>
      <div className='hero-img'>
        <img src={landingimg} alt="" />
      </div>
      <div className="hero-form module-border-wrap" >
        <div className='module'>
          <img src={Minilogo} alt="" />
          <Heading title="Welcome to Car Connect Pro" />
          <form className='form-container' onSubmit={handleSubmit}>
            <label htmlFor="" className='left-aligned'>Enter your Email</label>
            <br />
            <input type="text"onChange={(e) => { setUsername(e.target.value) }} className='name-field ' />
            <br />
            <label htmlFor="" className=' left-aligned top-spacer'>Enter your Password</label>
            <br />
            <input type="text" onChange={(e) => { setPassword(e.target.value) }} className='name-field ' />
            <br />
            <span className='left-aligned'>
              <div>
                <input type="checkbox" name="remember-me" className='top-spacer checkbox' id="" />
                <label className='top-spacer checkbox' htmlFor="remember-me">Remember Me</label>
              </div>
              <div>
                <label htmlFor="" className='fgt-pwd top-spacer link-text'> Forgot password</label>
              </div>
            </span>
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