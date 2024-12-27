import React, {useState, useEffect, useContext} from 'react';
import MessageInput from './MessageInput';
import {AppContext} from '../context/AppContext';

const ChatArea = () => {
	const {LoggedIn, username, chat} = useContext(AppContext);
	const [messages, setMessages] = useState([]);

	let conversationPartner =
		chat.username2 === username ? chat.username1 : chat.username2;

	if (!LoggedIn) {
		conversationPartner = 'User';
	}

	// UseEffect will be call always when conversationsPartner is changed
	useEffect(() => {
		const originalMessages = chat.messages;

		const transformedMessages = transformMessages(originalMessages);
		setMessages(transformedMessages);

		if (!LoggedIn) {
			setMessages([]);
		}
	}, [conversationPartner]);

	const handleSendMessage = (messageText) => {
		if (messageText.trim()) {
			setMessages([...messages, {sender: username, text: messageText}]);
		}
	};

	return (
		<div>
			<div>
				<h3>Chat with {conversationPartner || 'User'}</h3>
			</div>

			<div
				style={{
					height: '400px',
					overflowY: 'scroll',
					border: '1px solid #ccc',
					padding: '1rem',
				}}>
				{messages.map((msg, index) => (
					<div
						key={index}
						style={{textAlign: msg.sender === username ? 'right' : 'left'}}>
						<p>{msg.text}</p>
					</div>
				))}
			</div>
			<div style={{marginTop: '1rem'}}>
				<MessageInput onSendMessage={handleSendMessage} />
			</div>
		</div>
	);
};

const transformMessages = (messages) => {
	let transformed;
	if (messages) {
		transformed = messages.map((message) => ({
			sender: message.from,
			text: message.message,
		}));
	} else {
		transformed = [
			[
				{
					from: 'Alice',
					message: 'Hi Ronald',
				},
			],
		];
	}

	return transformed;
};

export default ChatArea;
