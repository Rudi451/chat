import React from 'react';

const ChatList = () => {
	const chats = [
		{
			id: 1,
			name: 'Alice',
			lastMessage: 'Hey there!',
			icon: '😎',
		},
		{id: 2, name: 'Bob', lastMessage: 'Let’s catch up.', icon: '👨‍🦱'},
	];

	return (
		<div>
			<h3>Chats</h3>
			<ul>
				{chats.map((chat) => (
					<li
						key={chat.id}
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '1rem',
						}}>
						<span style={{fontSize: '2rem', marginRight: '1rem'}}>
							{chat.icon}
						</span>
						<div>
							<strong>{chat.name}</strong>
							<p>{chat.lastMessage}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ChatList;
