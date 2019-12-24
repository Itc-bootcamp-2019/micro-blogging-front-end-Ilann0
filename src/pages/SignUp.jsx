import React from 'react';

import { signUp, postUser } from '../lib/firebaseHelpers';

class SignUp extends React.Component {
	constructor(props) {
        super(props);
        this.signUpCleanUp = this.signUpCleanUp.bind(this);
		this.state = {
			firstNameVal: '',
			lastNameVal: '',
			usernameVal: '',
			emailVal: '',
			passwordVal: '',
			// avatar: ''
		};
	}

	handleSubmit() {
		const {
			firstNameVal,
			lastNameVal,
			usernameVal,
			emailVal,
			passwordVal,
        } = this.state;
        
        signUp(emailVal, passwordVal)
            .then(response => {
                postUser({
                    first_name: firstNameVal,
                    last_name: lastNameVal,
                    username: usernameVal,
                    email: emailVal,
                    uid: response.user.uid,
                });
                this.signUpCleanUp();
            });
	}

	handleInputChange(event) {
		this.setState({
			[event.target.id]: event.target.value,
		});
	}

	render() {
		const {
			firstNameVal,
			lastNameVal,
			usernameVal,
			emailVal,
			passwordVal,
		} = this.state;
		return (
			<div class="signup-form">
				<div>
					<label htmlFor="firstNameVal">First Name:</label>
					<input
						id="firstNameVal"
						type="text"
						onChange={e => this.handleInputChange(e)}
						value={firstNameVal}
					/>

					<label htmlFor="lastNameVal">Last Name:</label>
					<input
						id="lastNameVal"
						type="text"
						onChange={e => this.handleInputChange(e)}
						value={lastNameVal}
					/>
				</div>
				<div>
					<label htmlFor="usernameVal">Username:</label>
					<input
						id="usernameVal"
						type="text"
						onChange={e => this.handleInputChange(e)}
						value={usernameVal}
					/>
				</div>
				<div>
					<label htmlFor="emailVal">Email:</label>
					<input
						id="emailVal"
						type="email"
						onChange={e => this.handleInputChange(e)}
						value={emailVal}
					/>
				</div>
				<div>
					<label htmlFor="passwordVal">Password:</label>
					<input
						id="passwordVal"
						type="password"
						onChange={e => this.handleInputChange(e)}
						value={passwordVal}
					/>
				</div>
				<button onClick={this.handleSubmit.bind(this)}>
					Create Account
				</button>
			</div>
		);
	}
}

export default SignUp;
