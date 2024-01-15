import React from 'react';
import './LoginStyles.css';
import landingimg from '../../../src/Images/sidelogin.jpg';
import Minilogo from '../../../src/Images/sidelogin.svg';
import Heading from '../Page-Header/header';

function Login() {
  return (
    <div className='hero-landing'>
      <div className='hero-img'>
        <img src={landingimg} alt="" />
      </div>
      <div className="hero-form module-border-wrap" >
       <div className='module'>
       <img src={Minilogo} alt="" />
        <Heading title="Welcome to Car Connect Pro"/>
        <form className='form-container' action="" method='POST'>
          <label htmlFor="" className='left-aligned'>Enter your name</label>
          <br />
          <input type="text" className='name-field ' />
          <br />
          <label htmlFor="" className=' left-aligned top-spacer'>Enter your Email</label>
          <br />
          <input type="text" className='name-field ' />
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

          <input className='sub-btn' type="submit" value="LOGIN" />
          <br />
          <div className="signup  top-spacer">Not a member? <a className='link-text' href="/signup">Signup</a></div>
        </form>
       </div>
      </div>
    </div>
  )
}

export default Login