import React, {useState} from 'react';

const MessageInput = ({onSendMessage}) => {
	const [inputText, setInputText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault(); // Verhindert Seiten-Neuladen
		if (inputText.trim()) {
			onSendMessage(inputText); // Callback an ChatArea
			setInputText(''); // Eingabefeld zurücksetzen
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{display: 'flex', alignItems: 'center'}}>
			<input
				type='text'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				placeholder='Type a message...'
				style={{
					flex: 1,
					margin: '10px',
					padding: '10px',
					borderRadius: '10px',
					border: '1px solid #ccc',
					outline: 'none',
					fontSize: '16px',
				}}
			/>
			<button
				type='submit'
				style={{
					marginLeft: '10px',
					padding: '10px 30px',

					border: 'none',

					cursor: 'pointer',
				}}
				className='sendButton'>
				<span className='buttonIcon'>Hello</span>
			</button>
		</form>
	);
};

export default MessageInput;
