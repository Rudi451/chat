import React, {useState} from 'react';

const ChatArea = () => {
	const [messages, setMessages] = useState([
		{sender: 'me', text: 'Hello!'},
		{sender: 'Alice', text: 'Hi! How are you?'},
	]);
	const [newMessage, setNewMessage] = useState('');

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			setMessages([...messages, {sender: 'me', text: newMessage}]);
			setNewMessage('');
		}
	};

	return (
		<div>
			<div>
				<h3>Chat with Alice</h3>
				<img src='https://via.placeholder.com/40' alt='Alice Icon' />
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
						style={{textAlign: msg.sender === 'me' ? 'right' : 'left'}}>
						<p>{msg.text}</p>
					</div>
				))}
			</div>
			<div style={{marginTop: '1rem'}}>
				<input
					type='text'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					style={{width: '80%', marginRight: '1rem'}}
				/>
				<button onClick={handleSendMessage}>Send</button>
			</div>
		</div>
	);
};

export default ChatArea;
