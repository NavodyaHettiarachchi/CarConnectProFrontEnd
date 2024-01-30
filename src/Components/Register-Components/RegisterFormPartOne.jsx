import React from 'react'
import Heading from '../Page-Header/header'
import './RegisterFormPartOne.css'

function RegisterFormPartOne() {
  return (
    <div>
      <Heading title="Create a new account"/>
      <form className='form-container'>
          <label htmlFor="" className='left-aligned'>Full Name</label>
          
          <input type="text" className='name-field ' />
          <br />
          <label htmlFor="" className='left-aligned top-spacer'>NIC Number</label>
          
          <input type="text" className='name-field ' />
          <br />
          <label htmlFor="" className='left-aligned top-spacer'>Birthday</label>
          
          <input type="date" className='name-field ' />
          <br />
          <label htmlFor="" className='left-aligned top-spacer'>Phone Number</label>
          
          <input type="text" className='name-field ' />
          <br />
          <label htmlFor="" className='left-aligned top-spacer'>Address</label>
          
          <input type="text" className='name-field ' />
          <br />
      </form>
    </div>
  )
}

export default RegisterFormPartOne