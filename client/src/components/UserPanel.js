import React, {useState, useContext} from 'react';
import axios from 'axios';

import {UserContext} from './UserContext';

import {AppContext} from '../context/AppContext';

import '../styles/App.css';
import RandomIcon from './RandomIcon';
import noIcon from './assets/user_icons/Emblem-person-grey.svg copy.png';
import SearchInput from './SearchInput';

const UserPanel = () => {
	const {LoggedIn, setLoggedIn, username, setUsername} = useContext(AppContext);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [inputUsername, setInputUsername] = useState('');

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				`http://localhost:5050/api/resources/chats/login?username=${inputUsername}`
			);
			if (response.status === 200) {
				setLoggedIn(true);
				setUsername(inputUsername);
				setDialogOpen(false);
			}
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	const handleLogout = () => {
		setLoggedIn(false);
		setUsername('');
	};

	return (
		<div className='user-top'>
			<div className='user-section'>
				<span>
					{LoggedIn ? (
						<RandomIcon />
					) : (
						<img src={noIcon} height={50} width={50}></img>
					)}
				</span>
				<span>{LoggedIn ? username : 'Guest'}</span>
				{!LoggedIn ? (
					<div>
						{/* <button onClick={() => setDialogOpen(true)}>Login</button> */}
						{/* {dialogOpen && ( */}
						<div className='dialog'>
							<input
								type='text'
								placeholder='Enter Username'
								value={inputUsername}
								onChange={(e) => setInputUsername(e.target.value)}
							/>
							<button onClick={handleLogin}>Login</button>
						</div>
						{/* )} */}
					</div>
				) : (
					<button onClick={handleLogout}>Logout</button>
				)}
			</div>
			<SearchInput />
		</div>
	);
};

export default UserPanel;
