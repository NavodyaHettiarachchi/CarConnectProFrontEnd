import React, { useState } from 'react';
import Heading from '../Page-Header/header';
import GoogleIcon from '@mui/icons-material/Google';
import { Alert } from '@mui/material';
import './RegisterFormPartTwo.css';
import axios from 'axios';
import {getResponseError} from '../../Data/errormsgFunc';
import { useNavigate } from 'react-router-dom';

function RegisterFormPartTwo({data, setData}) {
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
   
  const  isOwner = data.isOwner;
  const  username = data.username;
  const  password = data.password;
  const  name = data.name;
  const  gender = data.gender;
  const  dob = data.dob;
  const  email = data.email;
  const  phone = data.phone;
  const  street_1 = data.street_1;
  const  street_2 = data.street_2;
  const  city = data.city;
  const  province = data.province;
  const  nic = data.nic;
  const  center_type = data.center_type;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    setStatus(null);
    setSuccessMessage(null);


    try {

      let payload;

        if (isOwner) {
          payload = {
            isOwner,
            username,
            password,
            name,
            gender,
            dob,
            email,
            phone,
            street_1,
            street_2,
            city,
            province,
            nic,
          };
        } else {
          payload = {
            isOwner,
            username,
            password,
            name,
            email,
            phone,
            street_1,
            street_2,
            city,
            province,
            center_type
          };
        }

      const response = await axios.post("http://localhost:5000/register/", payload);

      const responseData = response.data;

      if (responseData.status === "success") {
        // console.log("Registration successful:", responseData.message);
        setSuccessMessage(responseData.message);

        // Registration successful, proceed with login
        const response = await axios.post('http://localhost:5000/login/', {username, password});
        const loginData = response.data.data;
        if (response.status === 200) {
          navigate('/');
          window.sessionStorage.setItem('schema', JSON.stringify(loginData.schema));
          window.sessionStorage.setItem('roles', JSON.stringify(loginData.user.roles));
          window.sessionStorage.setItem('IsLoggedIn', true);
          window.sessionStorage.setItem('userId', JSON.stringify(loginData.user.id));
          window.sessionStorage.setItem('user', JSON.stringify(loginData.user));
          window.sessionStorage.setItem('userType', JSON.stringify(loginData.roleType));//@Harindu
          let roles = loginData.user.roles.split(', ');
          const found = roles.filter((role) => role === 'mv:ad');
          console.log(found);
          if (found.length > 0) {
            navigate('/vehicle');
          } else {
            navigate('/service/');
          }
        } else {
          console.error("Login failed after registration");
        }
        //clear input fields

        setData({
          isOwner: "",
          username: "",
          password: "",
          name: "",
          gender: "",
          dob: "",
          email: "",
          phone: "",
          street_1: "",
          street_2: "",
          city: "",
          province: "",
          nic: "",
          center_type: ""
        })


      }

    } catch (error) {
      console.error("Error submitting registration:", error);
      if (error.response) {
        setErrors(getResponseError(error));
        setStatus(error.response.status);
        console.log(error.response.status);
        console.log(errors);
      } else {
        console.error("Network error or server did not respond with a valid HTTP response.");
      }
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
      {/* Display alert based on backend response */}
      
      {errors && (
        <Alert severity="error" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          {status === 409 || status === 500 ? (
            <div>{errors}</div>
          ) : (
            Object.values(errors).map((errorMsg, index) => (
              <div key={index}>{errorMsg}</div>
            ))
          )}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {successMessage}
        </Alert>
      )}
    </div>
  )
}

export default RegisterFormPartTwo;