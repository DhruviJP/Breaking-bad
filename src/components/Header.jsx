import React from 'react'
import logo from "../images/logo.png"
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className='navbar mt-3 text-center'>
                <Link to="/" className='d-inline-block'><img src={logo} alt="logo" className='d-block brand_img' /></Link>
            </div>
        </>
    )
}

export default Header