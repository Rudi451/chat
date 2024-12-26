import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AppContext} from '../context/AppContext';

import RandomIcon from './RandomIcon';
import ChatButton from './ChatButton';

const ChatList = () => {
	const {LoggedIn, username} = useContext(AppContext);
	const [chatList, setChatList] = useState([]);

	useEffect(() => {
		if (LoggedIn) {
			const fetchChats = async () => {
				console.log(
					'axios.defaults.withCredentials : ',
					axios.defaults.withCredentials
				);
				try {
					const response = await axios.get(
						`http://localhost:5050/api/resources/chats`
					);
					console.log(response.data);
					setChatList(response.data);
				} catch (error) {
					console.error('Failed to fetch chats:', error);
				}
			};
			fetchChats();
		}
	}, [LoggedIn, username]);

	if (!LoggedIn) {
		return <p>Please login</p>;
	}
	const handleChatClick = (chat) => {
		console.log('Clicked chat:', chat);
		// Perform an action with the chat, e.g., open the chat view
	};

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
				{chatList.length > 0 ? (
					chatList.map((chat, index) => (
						<ChatButton
							key={chat.username1 || index}
							chat={chat}
							onClick={handleChatClick}
						/>
					))
				) : (
					<p>No chats available.</p>
				)}
			</ul>
		</div>
	);
};

export default ChatList;
