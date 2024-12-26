import React, {createContext, useState} from 'react';

// Create Context
export const AppContext = createContext();

export const AppProvider = ({children}) => {
	const [LoggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState('');

	return (
		<AppContext.Provider value={{LoggedIn, setLoggedIn, username, setUsername}}>
			{children}
		</AppContext.Provider>
	);
};
