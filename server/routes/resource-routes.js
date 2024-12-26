import express from 'express';
import db from '../db/connections.js';
import HttpError from '../helpers/HttpError.js';

import {
	createChat,
	getAllChats,
	updateChatMessage,
	deleteChat,
	getChat,
	updateChatName,
} from '../controllers/chat-controller.js';

const router = express.Router();

// Get collections list
router.get('/', async (req, res) => {
	let collection = await db.listCollections().toArray();

	res.send(collection).status(200);
});
//___________________________________________________________
//// Chats Routes

router.get('/chats', getAllChats);

router.get('/chat', getChat);

router.put('/chats/update', updateChatMessage);
router.put('/chats/updateName', updateChatName);

router.post('/chats/new', createChat);

router.delete('/chats/delete/:id', deleteChat);

export default router;
