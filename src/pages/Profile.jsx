import React, { Component, useState, useEffect } from 'react';
import { changeUsername } from '../lib/firebase/database/users';

function Profile(props) {
    const validationRegex = new RegExp(
		'^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$', 'g'
	);
    const { isAllowed: user } = props;

	const [inputVal, setInputVal] = useState(user.username);
	const [message, setMessage] = useState('');

	function handleInputChange(e) {
		setInputVal('@' + e.target.value.slice(1));
	}

	function handleError(error) {
		setMessage(
			'We encountered a problem with the server.\nPlease try reloading the page or come back later :).'
		);
	}

	function saveUsername() {
        console.log(inputVal)
        if (validationRegex.test(inputVal.slice(1)))
            changeUsername(inputVal, user.uid)
                .then(() => {
                    setMessage('Your username has been saved!');
                })
                .catch(error => {
                    handleError(error);
                });
        else
            setMessage('Please check your username')
	}

    // debugger

	return (
		<div className="profile-main-container">
			<h1>Welcome back {user.first_name}.</h1>
			<label htmlFor="name-input">User Name</label>
			{message && <div>{message}</div>}
			<div className="input-frame">
				<input
					id="name-input"
					type="text"
					placeholder="i.e.: Yonatan"
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

export default Profile;
