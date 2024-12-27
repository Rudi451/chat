import React, {useState, useContext} from 'react';
import axios from 'axios';
import {AppContext} from '../context/AppContext';

const NewChat = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [chatName, setChatName] = useState('');
	const {LoggedIn, username, chat, setChat} = useContext(AppContext);
	const handleOpenDialog = () => {
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setChatName('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`http://localhost:5050/api/resources/chats/new?username1=${username}&username2=${chatName}`
			);
			console.log('Chat created:', response.data);
			handleCloseDialog();
		} catch (error) {
			console.error('Error creating chat:', error);
		}
	};

	return (
		<div>
			<button onClick={handleOpenDialog}> New Chat </button>
			{isDialogOpen && (
				<div style={dialogStyles}>
					<div style={dialogContentStyles}>
						<h2>Create New Chat</h2>
						<form onSubmit={handleSubmit}>
							<label>
								Chat Name:
								<input
									type='text'
									value={chatName}
									onChange={(e) => setChatName(e.target.value)}
									required
								/>
							</label>
							<div>
								<button type='submit'>Submit</button>
								<button type='button' onClick={handleCloseDialog}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

const dialogStyles = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const dialogContentStyles = {
	backgroundColor: '#fff',
	padding: '20px',
	borderRadius: '8px',
	maxWidth: '400px',
	width: '100%',
};

export default NewChat;
