import './styles/App.css';

import React from 'react';
import UserPanel from './components/UserPanel';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';

function App() {
	return (
		<div className='app-container'>
			<UserPanel />
			<ChatList />
			<ChatArea />
		</div>
	);
}

export default App;
