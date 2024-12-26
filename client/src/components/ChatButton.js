import React, {useContext} from 'react';
import RandomIcon from './RandomIcon';
import {AppContext} from '../context/AppContext';

const ChatButton = ({chat, onClick}) => {
	const {LoggedIn, username} = useContext(AppContext);
	const lastOne = chat.messages.length - 1;
	return (
		<button
			onClick={() => onClick(chat)}
			style={{
				display: 'flex',
				alignItems: 'center',
				width: '100%',
				padding: '1rem',
				marginBottom: '1rem',
				border: '1px solid #ccc',
				borderRadius: '5px',
				background: '#f9f9f9',
				cursor: 'pointer',
			}}>
			<span style={{fontSize: '2rem', marginRight: '1rem'}}>
				<RandomIcon />
			</span>
			<div>
				<strong>
					{chat.username1 === username ? chat.username2 : chat.username1}
				</strong>
				<p>{chat.messages[lastOne]?.message || 'No message available'}</p>
			</div>
		</button>
	);
};

export default ChatButton;
