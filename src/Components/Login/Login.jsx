import React, { useState } from 'react';
import './LoginStyles.css';
import landingimg from '../../../src/Images/sidelogin.jpg';
import Minilogo from '../../../src/Images/sidelogin.svg';
import Heading from '../Page-Header/header';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  async function submitform(e) {

    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/users/login', {
        username, password
      });


    } catch (e) {
      console.log(e);
    }

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (authenticate(username, password)) {
      console.log("true");
      navigate('/');
    } else {
      console.log("false");
      return false;
      
    }
  };

   function authenticate(username, password) {
    // Hardcoded values for demonstration purposes
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'password';

    if (username == hardcodedUsername && password == hardcodedPassword) {
      // Authentication successful
      return true;
    } else {
      // Authentication failed
      return false;
    }
  }

  return (
    <div className='hero-landing'>

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
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} className='name-field ' />
            <br />
            <label htmlFor="" className=' left-aligned top-spacer'>Enter your Password</label>
            <br />
            <input type="text" onChange={(e) => { setPassword(e.target.value) }} className='name-field ' />
            <br />
            <span className='left-aligned'>
              <div>
                <input type="checkbox" name="remember-me" className='top-spacer checkbox' id="" />
                <label className='top-spacer checkbox' for="remember-me">Remember Me</label>
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