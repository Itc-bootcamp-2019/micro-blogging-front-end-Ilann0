import React from "react";

import InputField from "../components/SignUp/InputField";

import { signUp } from '../lib/firebase/auth/emailAndPassword';
import { postUser } from "../lib/firebase/database/users";

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fnameVal: '',
			lnameVal: '',
			usernameVal: '',
			emailVal: '',
			passwordVal: '',
			confPasswordVal: '',
            errorMsg: '',
		};
	}

	handleInputChange(event) {
		this.setState({
			[event.target.id]: event.target.value,
		});
    }

    validForm() {
        const {
            fnameVal,
            lnameVal,
            emailVal,
            passwordVal,
            confPasswordVal,
        } = this.state;

        let msg;
        switch (true) {
			case !fnameVal:
                msg = 'Please provide a first name.'
				break;
			case !lnameVal:
                msg = 'Please provide a last name.';
				break;
			case !emailVal:
                msg = 'Please provide an email adress.';
				break;
			case !passwordVal:
                msg = 'Please provide a password.';
				break;
			case !confPasswordVal:
                msg = 'Please confirm your password.';
				break;
			case passwordVal !== confPasswordVal:
                msg = 'The passwords don\'t match';
                break;
            default:
                msg = '';
        }
        if (msg) {
            this.setState({ errorMsg: msg })
            return false;
        }
        return true;
    }

    handleSubmit() {
        if (this.state.errorMsg) this.setState({ errorMsg: '' });
        if (!this.validForm()) return; 
        const {
			fnameVal,
			lnameVal,
			usernameVal,
            emailVal,
            passwordVal,
        } = this.state;
        
        signUp(emailVal, passwordVal)
        .then(response => {
			postUser({
				first_name: fnameVal,
				last_name: lnameVal,
				username: usernameVal ? ('@' + usernameVal) : '@',
				email: emailVal,
                uid: response.user.uid,
			});
        })
        .catch(error => this.setState({ errorMsg: error.message }))
    }
	
	render() {
		const {
			fnameVal,
			lnameVal,
			usernameVal,
			emailVal,
			passwordVal,
            confPasswordVal,
            errorMsg,
		} = this.state;
		return (
			<div className="login-main-container sign-up">
				<h1>Sign Up</h1>
				{errorMsg && <div className="error">{errorMsg}</div>}
				<div className="double-field">
					<InputField
						placeholder="First Name"
						id="fnameVal"
						type="text"
						onChange={e => this.handleInputChange(e)}
						value={fnameVal}
					/>
					<InputField
						placeholder="Last Name"
						id="lnameVal"
						type="text"
						onChange={e => this.handleInputChange(e)}
						value={lnameVal}
					/>
				</div>
				<InputField
					placeholder="Username"
					id="usernameVal"
					type="text"
					onChange={e => this.handleInputChange(e)}
					value={usernameVal}
					className="single-field"
					regExPattern="^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/g"
				/>
				<InputField
					placeholder="Email"
					id="emailVal"
					type="email"
					onChange={e => this.handleInputChange(e)}
					value={emailVal}
					className="single-field"
				/>
				<div className="double-field">
					<InputField
						placeholder="Password"
						id="passwordVal"
						type="password"
						onChange={e => this.handleInputChange(e)}
						value={passwordVal}
					/>
					<InputField
						placeholder="Confirm password"
						id="confPasswordVal"
						type="password"
						onChange={e => this.handleInputChange(e)}
						value={confPasswordVal}
					/>
				</div>
				<button
					className="post-btn"
					onClick={this.handleSubmit.bind(this)}
				>
					Create Account
				</button>
			</div>
		);
	}
}
export default SignUp;