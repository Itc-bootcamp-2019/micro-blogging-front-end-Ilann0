import React from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <nav>
            <div className="nav-main-container">
                <NavLink exact to="/"
                         activeClassName={ 'active' }
                >
                    Home
                </NavLink>
                <NavLink exact to="/profile"
                         activeClassName={ 'active' }
                >
                    Profile
                </NavLink>
                <NavLink exact to="/login"
                    activeClassName={ 'active' }
                >
                    Login
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar