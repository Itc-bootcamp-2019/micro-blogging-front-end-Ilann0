import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
	const { user } = props
	return (
		<nav>
			<div className="nav-main-container">
				<div className="nav-left">
					<NavLink exact to="/" activeClassName={'active'}>
						Home
					</NavLink>
					<NavLink exact to="/profile" activeClassName={'active'}>
						Profile
					</NavLink>
				</div>
				<div className="nav-right">
					{ !user ? (
						<>
						<NavLink exact to="/signup" activeClassName={'active'}>
							Sign Up
						</NavLink>
						<NavLink exact to="/login" activeClassName={'active'}>
							Login
						</NavLink>
						</>
					) : (
						<NavLink exact to="/logout" activeClassName={'active'}>
							Logout
						</NavLink>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
