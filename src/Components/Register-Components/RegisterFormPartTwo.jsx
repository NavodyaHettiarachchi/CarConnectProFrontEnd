import React from 'react';
import Heading from '../Page-Header/header';
import GoogleIcon from '@mui/icons-material/Google';
import './RegisterFormPartTwo.css';


function RegisterFormPartTwo({data, setData}) {

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const resData = await response.json();
      console.log(resData);
  
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  }


  return (
    <div>
        <Heading title="Create a password"/>    
        <form className='form-container' onSubmit={handleSubmit}>
          <label htmlFor="" className='left-aligned top-spacer'>Username</label>
          <input onChange={(e) => setData({...data, username: e.target.value})} type="text" className='name-field ' />
          <br />
          <label htmlFor="" className='left-aligned top-spacer'>Password</label>
          <input onChange={(e) => setData({...data, password: e.target.value})} type="password" className='name-field ' />
          <br />
          {/* <label htmlFor="" className='left-aligned top-spacer'>Confirmed Password</label>
          
          <input onChange={(e) => setData({...data, confirmpassword: e.target.value})} type="password" className='name-field ' /> */}
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
          <input className='sub-btn' type="submit" value="CREATE ACCOUNT" onClick={handleSubmit} />
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