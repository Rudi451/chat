import React, {createContext, useState} from 'react';

export const UserContext = createContext({
	loggedIn: false,
	setLoggedIn: () => {},
});
