import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AppContext} from '../context/AppContext';

import RandomIcon from './RandomIcon';
import ChatButton from './ChatButton';
import ChatArea from './ChatArea';
import NewChat from './NewChat';

// const useChat = () => {
// 	return useContext(AppContext);
// };

const ChatList = () => {
	// const [selectedChat, setSelectedChat] = useState(null);
	// const {setChat} = useChat(); // Access the setChat function from the context

	const {LoggedIn, username, chat, setChat} = useContext(AppContext);
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
					//sort logic
					// we get:
					/**
					 *  
		{
        "_id": "676d5dc466347fd6da8f922a",
        "username1": "Not that Alice",
        "username2": "Ronald",
        "messages": [
            {
                "from": "Alice",
                "message": "Hi Ronald",
                "created": "2024-12-26T13:44:36.028Z"
            }
        						]
    }
					 */
					// i need to search the current nickname in the chats and set on the list only these
					// const chats = response.data.
					// setChatList(response.data);
					setChatList(filterAndSortChats(response.data, username));
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
		console.log('clicked chat: ', chat);
		setChat(chat); // Update the context value
	};

	return (
		<div>
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
								key={
									chat.username1 === username ? chat.username2 : index || index
								}
								chat={chat}
								onClick={handleChatClick}
							/>
						))
					) : (
						<p>No chats available.</p>
					)}
				</ul>
			</div>
			<NewChat />
		</div>
	);
};

const filterAndSortChats = (chats, currentNickname) => {
	let sortedChats;
	// Filter the chats to include only those where the user is involved
	const filteredChats = chats.filter(
		(chat) =>
			chat.username1 === currentNickname || chat.username2 === currentNickname
	);

	// Sort chats by the timestamp of the latest message (descending order)
	const length = 1;
	if (length) {
		sortedChats = filteredChats.sort((a, b) => {
			const latestMessageA = a.messages[a.messages.length - 1]?.created;
			const latestMessageB = b.messages[b.messages.length - 1]?.created;

			return new Date(latestMessageB) - new Date(latestMessageA); // Newer messages come first
		});
	} else {
		sortedChats = [];
	}

	return sortedChats;
};

export default ChatList;
