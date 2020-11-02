import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="container" >
            <h3>Apply and hear back every time</h3>
            <p>Exploring internships or jobs? Say good-bye to the typical job portals and use
            the power of Artificial Intelligence to become successful, faster.
            </p>
            <div className="vertical-center">
                <button><Link to='/signup'>Get Started</Link></button>
            </div>
        </div>
    )
}

export default Home;