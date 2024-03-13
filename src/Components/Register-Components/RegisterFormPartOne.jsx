import React, { useState } from 'react';
import Heading from '../Page-Header/header';
import './RegisterFormPartOne.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


function RegisterFormPartOne({ data, setData }) {
  const [value, setValue] = React.useState('user');
  const [selectedType, setSelectedType] = useState('user');

  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedType(event.target.value);
  };

  return (
    <div>
      <Heading title="Create a new account"/>

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="user" control={<Radio />} label="Register as a User" />
          <FormControlLabel value="center" control={<Radio />} label="Register as a Center" />
        </RadioGroup>
      </FormControl>
      
      <form className='form-container-user'>
        <div className='user-form'>
          <div>
            <label htmlFor="" className='left-aligned top-spacer'>Name</label>
            <input onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} type="text" className='text-field' />
            <br />
          
            {selectedType === 'user' && (
              <>
                <label htmlFor="" className='left-aligned top-spacer'>Gender</label>
                <select id="gender" onChange={(e) => setData({ ...data, gender: e.target.value })} value={data.gender} className='text-field'>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </>
            )}
            <br />
           
            {selectedType === 'center' && (
              <>
                <label htmlFor="" className='left-aligned top-spacer'>Center_Type</label>
                <select id="center_type" onChange={(e) => setData({ ...data, center_type: e.target.value })} value={data.center_type} className='text-field'>
                  <option value="B">Both Service and Repair Center</option>
                  <option value="R">Repair Center</option>
                  <option value="S">Service Center</option>
                </select>
              </>
            )}
            <br />
            
            {selectedType === 'user' && (
              <>
                <label htmlFor="" className='left-aligned top-spacer'>Birthday</label>
                <input onChange={(e) => setData({ ...data, dob: e.target.value })} value={data.dob} type="date" className='text-field' />
              </>
            )}
            <br />
            <label htmlFor="" className='left-aligned top-spacer'>Phone</label>
            <input onChange={(e) => setData({ ...data, phone: e.target.value })} value={data.phone} type="number" className='text-field' />
            <br />
           
            {selectedType === 'user' && (
              <>
                <label htmlFor="" className='left-aligned top-spacer'>NIC</label>
                <input onChange={(e) => setData({ ...data, nic: e.target.value })} value={data.nic} type="text" className='text-field' />
              </>
            )}
          </div>
          <div>
            <label htmlFor="" className='left-aligned top-spacer'>Email</label>
            <input onChange={(e) => setData({ ...data, email: e.target.value })} value={data.email} type="email" className='text-field' />
            <br />
            <label htmlFor="" className='left-aligned top-spacer'>Street_1</label>
            <input onChange={(e) => setData({ ...data, street_1: e.target.value })} value={data.street_1} type="text" className='text-field' />
            <br />
            <label htmlFor="" className='left-aligned top-spacer'>Street_2</label>
            <input onChange={(e) => setData({ ...data, street_2: e.target.value })} value={data.street_2} type="text" className='text-field' />
            <br />
            <label htmlFor="" className='left-aligned top-spacer'>City</label>
            <input onChange={(e) => setData({ ...data, city: e.target.value })} value={data.city} type="text" className='text-field' />
            <br />
            <label htmlFor="" className='left-aligned top-spacer'>Province</label>
            <input onChange={(e) => setData({ ...data, province: e.target.value })} value={data.province} type="text" className='text-field' />
            <br />
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterFormPartOne;