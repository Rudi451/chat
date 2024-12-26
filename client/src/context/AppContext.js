import React, {createContext, useState} from 'react';

// Create Context
export const AppContext = createContext();

export const AppProvider = ({children}) => {
	const [LoggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
	const [chat, setChat] = useState([]);

	return (
		<AppContext.Provider
			value={{LoggedIn, setLoggedIn, username, setUsername, chat, setChat}}>
			{children}
		</AppContext.Provider>
	);
};
