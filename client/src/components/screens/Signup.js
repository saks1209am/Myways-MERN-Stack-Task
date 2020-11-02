import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Signup.css'
import M from 'materialize-css'
import { Link } from 'react-router-dom'
const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const PostData = () => {
        fetch('/signup', {
            method: "post",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('./signin')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h4>Sign Up</h4>
                <h5>It's quick and easy</h5>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => PostData()}>
                    Sign Up
            </button>
                <h5><Link to='/reset'>Fogot password</Link></h5>
            </div>

        </div>
    )
}

export default Signup;