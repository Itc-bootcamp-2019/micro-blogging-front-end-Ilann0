import React from 'react';
import { postUser } from "../lib/firebase/database/users";
import { signIn } from '../lib/firebase/auth/emailAndPassword';
import { signInWithGoogle } from '../lib/firebase/auth/google';
import { Redirect, withRouter } from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailVal: '',
			passwordVal: '',
			errorMsg: '',
			success: false,
		};
	}

	handleSignIn() {
		signIn(this.state.emailVal, this.state.passwordVal)
			.catch(error =>
				this.setState({ errorMsg: error.message })
		);
	}

	handleGoogleSignIn() {
		signInWithGoogle()
			.then(response => {
				const { isNewUser, profile } = response.additionalUserInfo;
				debugger
				if ( isNewUser ) {
					postUser({
						first_name: profile.given_name,
						last_name: profile.family_name ? profile.family_name : '',
						email: profile.email,
						avatar: profile.picture,
						uid: response.user.uid,
					})
				}
			})
	}

	handleInputChange(event) {
		this.setState({
			errorMsg: '',
			[event.target.id]: event.target.value,
		});
	}

	render() {
		const { emailVal, passwordVal, errorMsg } = this.state;
		const { location, user, history } = this.props;
		const params = location.search ? new URLSearchParams(location.search) : false;
		
		if (params) {
			this.newLocation = '/' + params.get('next');
		} else {
			this.newLocation = "";
		}

		return (
			<div className="login-main-container">
				{user && (
					<Redirect
						to={
							this.newLocation !== undefined
								? this.newLocation
								: '/profile'
						}
					/>
				)}
				<h1>Login</h1>
				<div className="login-methods">
					<div className="login-left">
						{errorMsg && <div className="error">{errorMsg}</div>}
						<input
							placeholder="Email"
							id="emailVal"
							type="text"
							value={emailVal}
							onChange={e => this.handleInputChange(e)}
						/>
						<input
							placeholder="Password"
							id="passwordVal"
							type="password"
							value={passwordVal}
							onChange={e => this.handleInputChange(e)}
						/>
						<button
							onClick={this.handleSignIn.bind(this)}
							className="post-btn"
						>
							Login
						</button>
					</div>
					<div className="login-right">
						<div
							className="post-btn sign-with"
							onClick={() => history.push('/signup')}
						>
							<img
								src="https://static.thenounproject.com/png/6478-200.png"
								alt="sign up logo"
							/>
							<span>Sign Up</span>
						</div>
						<div
							className="post-btn sign-with"
							onClick={this.handleGoogleSignIn.bind(this)}
						>
							<img
								src="https://i.stack.imgur.com/TiQ81.png"
								alt="Google logo"
							/>
							<span>Sign in with Google</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
