import './styles/App.css';

import React from 'react';
import UserPanel from './components/UserPanel';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';

function App() {
	return (
		<div className='app-container'>
			<div className='left-section'>
				<UserPanel />
				<ChatList />
			</div>
			<div className='right-section'>
				<ChatArea />
			</div>
		</div>
	);
}

export default App;
