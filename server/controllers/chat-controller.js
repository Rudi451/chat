import db from '../db/connections.js';
import {MongoClient, ObjectId} from 'mongodb';
import HttpError from '../helpers/HttpError.js';
import {sendAnswer} from '../helpers/sendAnswer.js';
/**__________________________________________________________________________________________________
 */
export const getAllChats = async (req, res, next) => {
	// let collection = await db.collection('chats').find();
	let collection = await db.collection('chats').find().toArray();

	res.send(collection).status(200);
};
/**__________________________________________________________________________________________________
 */
export const createChat = async (req, res, next) => {
	const {username1, username2} = req.query;
	//
	if (!username1 || !username2) {
		return next(new HttpError('Both usernames are required.', 400));
	}
	// check a chat between persons (username1 username2) is already exist
	// if yes -> error toast 'chat already exist'

	// if not -> new chat
	try {
		// Check if a chat between the two users already exists
		const existingChat = await db.collection('chats').findOne({
			$or: [
				{username1, username2},
				{username1: username2, username2: username1}, // Check both directions
			],
		});

		if (existingChat) {
			// Chat already exists -> send error response
			return next(new HttpError('Chat already exists', 409));
		}

		// Create a new chat
		const newChatData = {
			username1,
			username2,
		};

		const result = await db.collection('chats').insertOne(newChatData);

		if (!result.acknowledged) {
			throw new Error('Failed to create chat.');
		}

		// console.log('req.query:', req.query);

		res.status(201).json({
			message: 'Chat created successfully.',
			chatId: result.insertedId,
		});
	} catch (err) {
		console.error(err);
		next(new HttpError('Creating chat failed, please try again later.', 500));
	}
};
/**__________________________________________________________________________________________________
 */
export const getChat = async (req, res, next) => {
	// require: chat id_
	// res.send -> object from db record with all messages history
	try {
		const {id} = req.query;
		// console.log('id is:', id);
		// Valid the ID
		if (!id || !ObjectId.isValid(id)) {
			next(new HttpError('Invalid or missing ID', 400));
		}

		// set connection to the database
		const chatsCollection = db.collection('chats');

		// Search for document with the corresponding ID
		const chat = await chatsCollection.findOne({
			_id: ObjectId.createFromHexString(id),
		});

		if (!chat) {
			next(new HttpError(' Chat not found ', 404));
		}

		//Successful response
		res.status(200).json(chat);
	} catch (error) {
		next(new HttpError('Internal server error', 500));
	}
};
/**__________________________________________________________________________________________________
 */
export const updateChatMessage = async (req, res, next) => {
	const {from, to, message} = req.query;

	if (!from || !to || !message) {
		return next(
			new HttpError('Missing required parameters: from, to, or message', 400)
		);
	}

	try {
		const chatsCollection = db.collection('chats');

		// Suche nach einem existierenden Chat
		const existingChat = await chatsCollection.findOne({
			$or: [
				{username1: from, username2: to},
				{username1: to, username2: from}, // Beide Richtungen prüfen
			],
		});

		if (existingChat) {
			// Update den existierenden Chat mit einer neuen Nachricht
			console.log('existingChat id: ', existingChat._id);
			const result = await chatsCollection.updateOne(
				{_id: existingChat._id}, // Filter nach Chat-ID
				{
					$push: {
						messages: {
							from,
							message,
							created: new Date(),
						},
					},
				}
			);

			if (result.modifiedCount > 0) {
				sendAnswer(req, res, next, to, existingChat._id);
			} else {
				throw new Error('Failed to update the chat.');
			}
		} else {
			// Erstelle einen neuen Chat mit der ersten Nachricht
			const newChatData = {
				username1: from,
				username2: to,
				messages: [
					{
						from,
						message,
						created: new Date(),
					},
				],
			};

			const result = await chatsCollection.insertOne(newChatData);

			if (result.acknowledged) {
				sendAnswer(req, res, next, to, result._id);
			} else {
				throw new Error('Failed to create chat.');
			}
		}
	} catch (err) {
		console.error('Error updating chat:', err);
		next(new HttpError('Internal server error', 500));
	}
};
/**__________________________________________________________________________________________________
 */
export const updateChatName = async (req, res, next) => {
	//TODO: turn on users when the users db will be ready
	//
	//require in params: old name, new name and chat id
	try {
		const {username, usernameNew, userId} = req.query;
		console.log(
			'username, usernameNew, userId: ',
			username,
			usernameNew,
			userId
		);
		// Validate parameters
		// if (!username || !usernameNew || !userId || !ObjectId.isValid(userId)) {
		// 	return next(new HttpError('Invalid or missing parameters', 400));
		// }
		if (!username || !usernameNew) {
			return next(new HttpError('Invalid or missing parameters', 400));
		}

		// 1. Find the user by ID and verify if they exist
		// const user = await db
		// 	.collection('users')
		// 	.findOne({_id: ObjectId.createFromHexString(userId)});

		// if (!user) {
		// 	return next(new HttpError('User not found', 404));
		// }

		// 2. Update all chats involving the user with the new username

		// const result = await db.collection('chats').updateMany(
		// 	{participants: username},
		// 	{$set: {'participants.$': usernameNew}} // Update only the specific entry in the participants array
		// );
		const result = await db.collection('chats').updateMany(
			{
				username1: username,
			},
			{
				$set: {username1: username},
			}
		);
		const result2 = await db.collection('chats').updateMany(
			{
				$or: [{username2: username}],
			},
			{
				$set: {username2: username},
			}
		);
		console.log('result: ', result);
		if (!result || result.modifiedCount === 0) {
			return next(new HttpError('Error when writing to database', 400));
		}

		// 3. Update the user's record to use the new username
		// await db
		// 	.collection('users')
		// 	.updateOne(
		// 		{_id: ObjectId.createFromHexString(userId)},
		// 		{$set: {username: usernameNew}}
		// 	);

		// Respond with success
		res.status(200).json({message: 'Username updated successfully'});
	} catch (err) {
		console.error('Error updating chat name:', err);
		next(new HttpError('Internal server error', 500));
	}

	// find user in db via id, and if there is a one -> update all chats with this user

	// find main record with names
	// find current name
	// update name
	//TODO: HOW you call all of the parts of database mongo db, records, collections etc ? //
	/**
	 * update only main chat record and user record and keep
	 * the old name is in the previous messages in the chats
	 */
	//TODO: end
};
export const chatSearch = async (req, res, next) => {
	// get request
	//
	// require: search params
	// find the records with this params
	// check : if is username -> show only chat with user (res object {type: chat, chatID: _id })
	//         if is message -> show chat and this message with date (res object {type: message, chatID: _id})
	//         if no data -> no chats found
};

/**__________________________________________________________________________________________________
 */

export const deleteChat = async (req, res, next) => {
	const {id} = req.params;
	// console.log('id to delete: ', id);
	if (!id) {
		return next(new HttpError('ID is required to delete a chat.', 400));
	}

	try {
		//Check whether the record exists
		const record = await db
			.collection('chats')
			.findOne({_id: ObjectId.createFromHexString(id)});

		if (!record) {
			return res.status(404).json({
				message: 'Chat not found.',
			});
		}

		//Delete the record
		const result = await db
			.collection('chats')
			.deleteOne({_id: ObjectId.createFromHexString(id)});

		if (result.deletedCount === 0) {
			throw new Error('Failed to delete the chat.');
		}

		res.status(200).json({
			message: 'Chat deleted successfully.',
			deletedId: id,
		});
	} catch (err) {
		console.error(err);
		next(new HttpError('Deleting chat failed, please try again later.', 500));
	}
};
