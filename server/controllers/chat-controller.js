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
export const updateChat = async (req, res, next) => {
	const {from, to, message} = req.query;

	if (!from || !to || !message) {
		return res.status(400).json({
			error: 'Missing required parameters: from, to, or message.',
		});
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
				// return res.json({message: 'New chat created, and message added.'});
			} else {
				throw new Error('Failed to create chat.');
			}
		}
	} catch (err) {
		console.error('Error updating chat:', err);
		return res.status(500).json({error: 'Internal server error.'});
	}
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
