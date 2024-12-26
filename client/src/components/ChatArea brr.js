import React, {useState, useEffect, useContext} from 'react';
import MessageInput from './MessageInput';
import {AppContext} from '../context/AppContext';

const ChatArea = (params) => {
	let count = false;
	const {LoggedIn, username, chat} = useContext(AppContext);
	const [messages, setMessages] = useState([
		...transformMessages(chat.messages),
	]);

	useEffect(() => {
		const originalMessages = chat.messages;

		const transformedMessages = transformMessages(originalMessages);
		setMessages(transformedMessages);
	}, []); // Empty dependency array ensures this effect runs only once after initial render

	function transformMessages(messages) {
		return messages.map((message) => ({
			sender: message.from === 'Alice' ? 'Alice' : 'me',
			text: message.message,
		}));
	}

	return (
		<div>
			{messages.map((message, index) => (
				<p key={index}>
					<strong>{message.sender}:</strong> {message.text}
				</p>
			))}
		</div>
	);
};

export default ChatArea;
