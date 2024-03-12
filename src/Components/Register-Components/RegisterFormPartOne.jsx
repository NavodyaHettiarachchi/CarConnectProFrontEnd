import React, { useState } from 'react';
import Heading from '../Page-Header/header';
import './RegisterFormPartOne.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function RegisterFormPartOne({data, setData}) {
  const [value, setValue] = React.useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedType(event.target.value); // Update selectedType when radio button changes
  };

  return (
    <div>
      <Heading title="Create a new account"/>

      <FormControl>
        {/* <FormLabel id="demo-controlled-radio-buttons-group">Select the account type</FormLabel> */}
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
      
      {selectedType === 'user' && (
        <form className='form-container-user'>
          <div className='user-form'>
            <div >
              <label htmlFor="" className='left-aligned top-spacer'>Name</label>
              <input onChange={(e) => setData({...data, name: e.target.value})} value={data.name} type="text" className='text-field ' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Gender</label>
              <input onChange={(e) => setData({...data, gender: e.target.value})} value={data.gender} type="text" className='text-field ' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Birthday</label>
              <input onChange={(e) => setData({...data, dob: e.target.value})} value={data.dob} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Phone</label>
              <input onChange={(e) => setData({...data, phone: e.target.value})} value={data.phone} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>nic</label>
              <input onChange={(e) => setData({...data, nic: e.target.value})} value={data.nic} type="text" className='text-field' />
              <br />
            </div>
            <div>
              <label htmlFor="" className='left-aligned top-spacer'>Email</label>
              <input onChange={(e) => setData({...data, email: e.target.value})} value={data.email} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Street_1</label>
              <input onChange={(e) => setData({...data, street_1: e.target.value})} value={data.street_1} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Street_2</label>
              <input onChange={(e) => setData({...data, street_2: e.target.value})} value={data.street_2} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>City</label>
              <input onChange={(e) => setData({...data, city: e.target.value})} value={data.city} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Province</label>
              <input onChange={(e) => setData({...data, province: e.target.value})} value={data.province} type="text" className='text-field' />
              <br />
            </div>
          </div>
        </form>
      )}
      {selectedType === 'center' && (
        <form className='form-container-center'>
          <div className='user-form'>
            <div >
              <label htmlFor="" className='left-aligned top-spacer'>Name</label>
              <input onChange={(e) => setData({...data, name: e.target.value})} value={data.name} type="text" className='text-field ' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Type</label>
              <input onChange={(e) => setData({...data, type: e.target.value})} value={data.type} type="text" className='text-field ' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Phone</label>
              <input onChange={(e) => setData({...data, phone: e.target.value})} value={data.phone} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Email</label>
              <input onChange={(e) => setData({...data, email: e.target.value})} value={data.email} type="text" className='text-field' />
              <br />
            </div>
            <div>
              <label htmlFor="" className='left-aligned top-spacer'>Street_1</label>
              <input onChange={(e) => setData({...data, street_1: e.target.value})} value={data.street_1} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Street_2</label>
              <input onChange={(e) => setData({...data, street_2: e.target.value})} value={data.street_2} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>City</label>
              <input onChange={(e) => setData({...data, city: e.target.value})} value={data.city} type="text" className='text-field' />
              <br />
              <label htmlFor="" className='left-aligned top-spacer'>Province</label>
              <input onChange={(e) => setData({...data, province: e.target.value})} value={data.province} type="text" className='text-field' />
              <br />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterFormPartOne;