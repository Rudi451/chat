import React, {useState} from 'react';
import icon1 from '../images/Emblem-person-blue.svg.png';
import icon2 from '../images/Emblem-person-brown.svg.png';
import icon3 from '../images/Emblem-person-green.svg.png';
import icon4 from '../images/User_icon_3.svg.png';

const UserPanel = () => {
	const [loggedIn, setLoggedIn] = useState(false);

	const handleLoginLogout = () => setLoggedIn(!loggedIn);

	return (
		<div>
			<h3>Users</h3>
			<button onClick={handleLoginLogout}>
				{loggedIn ? 'Log Out' : 'Log In'}
			</button>
			<div className='user-info'>
				{loggedIn ? (
					<div>
						<img src={icon1} height={30} width={30}></img>
						<p>John Doe</p>
					</div>
				) : (
					<p>Please log in</p>
				)}
			</div>
		</div>
	);
};

export default UserPanel;
