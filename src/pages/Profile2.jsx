import React, { useState } from 'react';
import { changeUserDetails } from '../lib/firebase/database/users';

function Profile2(props) {
    const validationRegex = new RegExp(
		'^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$', 'g'
	);
    const { isAllowed: user } = props;

	const [inputVal, setInputVal] = useState(user.username);
	const [message, setMessage] = useState('');

	function handleInputChange(e) {
		setInputVal(e.target.value);
	}

	function handleError(error) {
		setMessage(
			'We encountered a problem with the server.\nPlease try reloading the page or come back later :).'
		);
	}

	function saveUsername() {
        if (validationRegex.test(inputVal.slice(1)))
            changeUserDetails({ username: '@' + inputVal }, user.uid)
                .then(() => {
                    setMessage('Your username has been saved!');
                })
                .catch(error => {
                    handleError(error);
                });
        else
            setMessage('Please check your username')
	}

	return (
		<div className="profile-main-container">
			<h1>
				Welcome back{' '}
				{user.first_name.charAt(0).toUpperCase() +
					user.first_name.slice(1)}
				.
			</h1>
			<h3 className="label">
				Full name: { user.first_name + ' ' + user.last_name }
			</h3>
		</div>
	);

	return (
		<div className="profile-main-container">
			<h1>
				Welcome back{' '}
				{user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}.
			</h1>
			<label htmlFor="name-input">User Name</label>
			{message && <div>{message}</div>}
			<div className="input-frame">
				<input
					id="name-input"
					type="text"
					placeholder="KebabEater3000"
					onChange={e => handleInputChange(e)}
					value={inputVal}
				/>
			</div>
			<button className="post-btn" onClick={saveUsername}>
				Save
			</button>
		</div>
	);
}



export default Profile2;
