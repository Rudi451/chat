import db from '../db/connections.js';
import {MongoClient} from 'mongodb';

export const createChat = async (req, res, next) => {
	const {username1, username2} = req.query;
	// check a chat between persons (username1 username2) is already exist
	// if not -> new chat

	// if yes -> error toast 'chat already exist'
	const newChatData = {
		username1,
		username2,
	};
	try {
		db.collection('chats').insertOne(newChatData);
	} catch (err) {
		console.log(err);
	}
	console.log('req.query:', req.query);

	res.status(200).send('new chat not ready');
};

export const getAllChats = async (req, res, next) => {
	// let collection = await db.collection('chats').find();
	let collection = await db.collection('chats').find().toArray();

	res.send(collection).status(200);
};

export const updateChat = async (req, res, next) => {
	const {from, to, message} = req.query;

	if (!from || !to || !message) {
		return res
			.status(400)
			.json({error: 'Missing required parameters: from, to, or message.'});
	}

	try {
		const chatsCollection = db.collection('chats');

		// Suchen nach dem Record
		const filter = {username1: from, username2: to};
		const update = {
			$push: {messages: {from, message, created: new Date()}}, // Fügt die neue Nachricht zum Array hinzu
		};

		const options = {upsert: true}; // Falls kein Dokument gefunden wird, wird ein neues erstellt

		const result = await chatsCollection.updateOne(filter, update, options);

		if (result.matchedCount > 0) {
			res.json({message: 'Message added to existing chat.'});
		} else {
			res.json({message: 'New chat created, and message added.'});
		}
	} catch (err) {
		console.error('Error updating chat:', err);
		res.status(500).json({error: 'Internal server error.'});
	}
};
