import React from 'react';
import landingimg from '../../../src/Images/sidelogin.jpg';
import Minilogo from '../../../src/Images/sidelogin.svg';
import Heading from '../Page-Header/header';
import { Typeitems } from './typeitems';



function Signup(props) {
    return (
        <div className='hero-landing'>
            <div className='hero-img'>
                <img src={landingimg} alt="" />
            </div>
            <div className="hero-form module-border-wrap" >
                <div className='module'>
                    <img src={Minilogo} alt="" />
                    <Heading
                        title="Create your account" />
                    <form className='form-container' action="" method='POST'>
                        <label htmlFor="" className='left-aligned'>Type</label>
                        <br />
                        <select className='' name="type" id="">
                        
                        </select>
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

                                <a htmlFor="" className="top-spacer fgt-pwd"> Forgot password</a>

                            </div>
                        </span>

                        <input className='sub-btn' type="submit" value="LOGIN" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;