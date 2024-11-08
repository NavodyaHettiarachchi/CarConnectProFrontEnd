import React, { useState } from 'react'
import landingimg from '../../../src/Images/sidelogin.jpg';
import Minilogo from '../../../src/Images/sidelogin.svg';
import RegisterFormPartOne from './RegisterFormPartOne';
import RegisterFormPartTwo from './RegisterFormPartTwo';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './Register.css'


function Register() {
  const [page, setPage] = useState(0)
  const [data, setData] = useState({
    isOwner: '',
    username: '',
    password: '',
    // confirmpassword: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    street_1: '',
    street_2: '',
    city: '',
    province: '',
    nic: '',
    center_type: '',
  })

  console.log(data);
  
  const titles = { RegisterFormPartOne, RegisterFormPartTwo };

  const registerpartDisplay = () => {
    if (page === 0) {
      return <RegisterFormPartOne data={data} setData={setData}/>
    } else {
      return <RegisterFormPartTwo data={data} setData={setData}/>
    }
  }


  return (
    <div className='hero-landing-login' >
      <div className='hero-img'>
        <img src={landingimg} alt="" />
      </div>
      <div className='hero-form module-border-wrap'>
        <div className='module'>
          <img src={Minilogo} alt="" />
          {registerpartDisplay()}
          <div className='stage-3'>
            <div className='stage-31'>
              <button className='back'
                disabled={page === 0}
                onClick={() => {
                  setPage((currPage) => currPage - 1)
                }}
              ><ArrowBackIcon /></button>
              <button className='back'
                disabled={page === 1}
                onClick={(e) => {
                  if (page === titles.length - 1) {
                    alert('Form submitted')

                  } else {
                    setPage((Page) => Page + 1)
                  }
                }}
              ><ArrowForwardIcon /></button>
            </div>
            <div className='stage-32'>
              <p className="already-a-member">
                <span className="text-wrapper-3">Already a member? </span>
                <span className="text-wrapper-4"><a href='/login'>Login!</a></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register