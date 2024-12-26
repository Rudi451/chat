import React from 'react';
import RandomIcon from './RandomIcon';

const ChatButton = ({chat, onClick}) => {
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
				<strong>{chat.username1}</strong>
				<p>{chat.messages[0]?.message || 'No message available'}</p>
			</div>
		</button>
	);
};

export default ChatButton;
