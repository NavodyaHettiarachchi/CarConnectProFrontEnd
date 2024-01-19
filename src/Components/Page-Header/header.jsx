import React from 'react'

function header(props) {
    return (
        <div>
            <h2 className='login-heading no-padding'>Car Connect Pro</h2>
            <h3 className='login-welcome no-padding'>Welcome</h3>
            <h3 className='login-heading '>{props.title}</h3>
            <span className="hori-ruler"></span>
        </div>
    )
}

export default header