import React from 'react'
import Logo from './LOGO.png'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to='/'><img src={Logo}></img></Link>
            </div>
            <div className="navbar-right">
                {/* <div class="dropdown">
                    <button class="dropbtn">For you</button>
                    <div class="dropdown-content">
                        <a href="#">Find matching internships</a>
                        <a href="#">Hire right talent</a>
                        <a href="#">Work From Home</a>
                    </div>
                </div> */}
                <p>For you
                    <select>Find Matching internships</select>
                    <select>Hire right talent</select>
                    <select>Work From Home</select>
                </p>
                <p>Instant Apply</p>
                <p>Pricing</p>
                <p>About Us</p>
                <p><Link to='/signup'>SIGN UP</Link></p>
                <p><Link to='/signin'><button>LOGIN</button></Link></p>
            </div>


        </div>
    );
}

export default Navbar;