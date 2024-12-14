import React, {useState} from 'react';

import '../styles/App.css';
import RandomIcon from './RandomIcon';
import noIcon from './assets/user_icons/Emblem-person-grey.svg copy.png';
import SearchInput from './SearchInput';

const UserPanel = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLoginLogout = () => setLoggedIn(!loggedIn);

	return (
		<div className='user-top'>
			<div className='user-section'>
				{loggedIn ? (
					<div className='user-info'>
						<RandomIcon />
						<p>John Doe</p>
					</div>
				) : (
					<img src={noIcon} height={50} width={50}></img>
				)}

				<button onClick={handleLoginLogout}>
					{loggedIn ? 'Log out' : 'Log in'}
				</button>
			</div>

			<SearchInput />
		</div>
	);
};

export default UserPanel;
