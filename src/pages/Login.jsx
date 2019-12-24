import React from 'react';
import { signIn } from '../lib/firebase/auth/emailAndPassword';
import { signInWithGoogle } from '../lib/firebase/auth/google';
import { Redirect } from 'react-router-dom';

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
		signIn(this.state.emailVal, this.state.passwordVal).catch(error =>
			this.handleError(error)
		);
	}

	handleError(error) {
		let msg;
		switch (error.code) {
			case 'auth/network-request-failed':
				msg =
					'We encountered a problem with the server.\nPlease verify your internet connection or try again later :)';
				break;
			case 'auth/invalid-email':
				msg = 'The email entered is invalid';
				break;
			case 'auth/wrong-password':
				msg = 'The password entered is invalid';
				break;
			default:
				msg = 'Something went horribly wrong..';
		}
		this.setState({
			errorMsg: msg,
		});
	}

	handleInputChange(event) {
		this.setState({
			[event.target.id]: event.target.value,
		});
	}

	componentWillUnmount() {
		this.props.setInitialLogin(false)
		// debugger
	}

	render() {
		const { emailVal, passwordVal, errorMsg } = this.state;
		const { isLoggedIn, location, initialLogin } = this.props;
		const params = location.search ? new URLSearchParams(location.search) : false;
		
		let newLocation;
		if (params) {
			newLocation = '/' + params.get('next');
		} else if ((location.pathname === '/login') && ( initialLogin )){
			newLocation = "";
		} else {
			newLocation = "/profile";
		}
		debugger

		return (
			<div className="login-main-container">
				{isLoggedIn && <Redirect to={newLocation} />}
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
							onClick={signInWithGoogle}
							className="post-btn sign-with"
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

export default Login; //withRouter(Login);
