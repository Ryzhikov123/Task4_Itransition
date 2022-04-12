import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {useHistory} from 'react-router'

import {AuthContext} from "../../context/AuthContext"

const Navbar = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = async (e) => {
        e.preventDefault()
        await auth.logout()
        history.push('/')
    }
    return (
            <nav className="fixed-navbar">
                <div className="nav-wrapper">
                    <div className="nav-wrapper navbar-right">
                        <NavLink to="/users" className="brand-logo left">Users List</NavLink>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </nav>


    )
}

export default Navbar
