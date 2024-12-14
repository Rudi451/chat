import React, {useState} from 'react';
import MessageInput from './MessageInput';

const ChatArea = () => {
	const [messages, setMessages] = useState([
		{sender: 'me', text: 'Hello!'},
		{sender: 'Alice', text: 'Hi! How are you?'},
	]);

	const handleSendMessage = (messageText) => {
		if (messageText.trim()) {
			setMessages([...messages, {sender: 'me', text: messageText}]);
		}
	};

	return (
		<div>
			<div>
				{/* Hier den aktuelle Chat-User mit Icon und Namen */}
				<h3>Chat with Alice</h3>
				<img src='https://via.placeholder.com/40' alt='Alice Icon' />
			</div>
			{/* Hier die Message-History */}
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
						style={{textAlign: msg.sender === 'me' ? 'right' : 'left'}}>
						<p>{msg.text}</p>
					</div>
				))}
			</div>
			<div style={{marginTop: '1rem'}}>
				{/* MessageInput mit Callback */}
				<MessageInput onSendMessage={handleSendMessage} />
			</div>
		</div>
	);
};

export default ChatArea;
