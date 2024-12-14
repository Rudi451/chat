import React from 'react';

const ChatList = () => {
	const chats = [
		{
			id: 1,
			name: 'Alice',
			lastMessage: 'Hey there!',
			icon: '😎',
			lastUpdate: 'Aug 17, 2022',
		},
		{
			id: 2,
			name: 'Bob',
			lastMessage: 'Let’s catch up.',
			icon: '👨‍🦱',
			lastUpdate: 'Sep 17, 2023',
		},
	];

	return (
		<div>
			<h3
				style={{
					color: 'rgb(9, 189, 189)',
					fontWeight: '0',
					fontFamily: 'Arial',
				}}>
				Chats
			</h3>
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
						<div>
							<span>{chat.lastUpdate}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ChatList;
