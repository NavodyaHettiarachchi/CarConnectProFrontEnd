import React from 'react'
import Heading from '../Page-Header/header'
import GoogleIcon from '@mui/icons-material/Google';
import './RegisterFormPartTwo.css'

function RegisterFormPartTwo() {
  return (
    <div>
        <Heading title="Create a password"/>    
        <form className='form-container'>
          <label htmlFor="" className='left-aligned'>Your Email</label>
          
          <input type="text" className='name-field ' />
          <br />
          <label htmlFor="" className='left-aligned top-spacer'>Password</label>
          
          <input type="password" className='name-field ' />
          <br />
          <label htmlFor="" className='left-aligned top-spacer'>Confirmed Password</label>
          
          <input type="password" className='name-field ' />
          <span className='left-aligned space-between'>
            <div>
              <input type="checkbox" name="remember-me" className='top-spacer checkbox' id="" />
            </div>
            <div>
              <p className="fgt-pwd top-spacer link-text">
                  <span className="text-wrapper-3">I agree to the </span>
                  <span className="text-wrapper-4"><a href=''>Terms</a> </span>
                  <span className="text-wrapper-3">of </span>
                  <span className="text-wrapper-4"><a href=''>Service and Privacy Policy</a></span>
               </p>
            </div>
          </span>
          <input className='sub-btn' type="submit" value="Create" />
          <br />
          <span className="link-text top-spacer">or</span>
          <br />
          <button className='signup'><GoogleIcon/>  sign up with Google</button>
          <br />
      </form>
    </div>
  )
}

export default RegisterFormPartTwo