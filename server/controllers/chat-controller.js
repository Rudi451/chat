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

export const newMessage = async (req, res, next) => {
	// we need username 1 and username 2
	// we need date
	//
	const {username1, username2, message} = req.query;

	const newChatData = {
		username1,
		username2,
		messages: [
			{
				from: username2,
				message,
				receivedAt: new Date(),
			},
		],
		createdAt: new Date(),
	};
	const result = await db.collection('chat').updateOne(
		{_id: new MongoClient.ObjectId('67609e4d0038da38f482ca34')}, //chat id
		{$push: {message: newChatData}}
	);

	res.send('not ready');
};
