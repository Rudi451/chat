import express from 'express';
import db from '../db/connections.js';
import HttpError from '../helpers/HttpError.js';

import {
	createChat,
	getAllChats,
	updateChat,
	deleteChat,
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

router.put('/chats/update', updateChat);

router.post('/chats/new', createChat);

router.delete('/chats/delete/:id', deleteChat);

export default router;
