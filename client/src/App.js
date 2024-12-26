import './styles/App.css';

import React from 'react';
import UserPanel from './components/UserPanel';
import ChatList from './components/ChatList';
import ChatArea from './components/ChatArea';
import {AppProvider} from './context/AppContext';

function App() {
	return (
		<AppProvider>
			<div className='app-container'>
				<div className='section'>
					<UserPanel />
					<ChatList />
				</div>
				<div className='right-section'>
					<ChatArea />
				</div>
			</div>
		</AppProvider>
	);
}

export default App;
