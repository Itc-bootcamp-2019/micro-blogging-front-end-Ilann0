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
					setMessage({
						isError: false,
						msg: 'Your username has been saved!',
					});
				})
				.catch(error => {
					handleError(error);
				});
		else if (inputVal === '')
			setMessage({
				isError: true,
				msg: 'Uesername cannot be empty',
			});
		else
			setMessage({
				isError: true,
				msg: 'Username contains bad characters',
			});
	}

	return (
		<div className="profile-main-container">
			<div className="profile-title">
				<h1>Profile</h1>
				<button className="post-btn">Edit</button>
			</div>
			<div className="profile-card">
				<div className="profile-top">
					<img
						className="profile-avatar"
						src={user.avatar}
						alt="Avatar"
					/>
					<div className="profile-name-container">
						<h3>{user.first_name}</h3>
						<h3>{user.last_name}</h3>
						{ !!user.username && <h3 className="profile-username">{user.username}</h3>}
						{  !user.username && <h3 className="profile-username link">Set username</h3>}
					</div>
				</div>
				<h3 className="profile-email">{user.email}</h3>
			</div>
		</div>
	);
}



export default Profile2;
