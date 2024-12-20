import express from 'express';
import db from '../db/connections.js';
import {
	createChat,
	getAllChats,
	updateChat,
} from '../controllers/chat-controller.js';

// This help convert the id from string to ObjectId for the _id.
import {ObjectId} from 'mongodb';

const router = express.Router();

// Get collections list
router.get('/', async (req, res) => {
	let collection = await db.listCollections().toArray();

	res.send(collection).status(200);
});
//___________________________________________________________
//// Chats Routes

// This section will help you get a single record by id
// router.get('/:id', async (req, res) => {
// 	let collection = await db.collection('records');
// 	let query = {_id: new ObjectId(req.params.id)};
// 	let result = await collection.findOne(query);

// 	if (!result) res.send('Not found').status(404);
// 	else res.send(result).status(200);
// });

router.get('/chats', getAllChats);

router.put('/chats', updateChat);

router.post('/chats/new', createChat);

// This section will help you update a record by id.
router.patch('/:id', async (req, res) => {
	try {
		const query = {_id: new ObjectId(req.params.id)};
		const updates = {
			$set: {
				name: req.body.name,
				position: req.body.position,
				level: req.body.level,
			},
		};

		let collection = await db.collection('records');
		let result = await collection.updateOne(query, updates);
		res.send(result).status(200);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error updating record');
	}
});

// This section will help you delete a record
router.delete('/:id', async (req, res) => {
	try {
		const query = {_id: new ObjectId(req.params.id)};

		const collection = db.collection('records');
		let result = await collection.deleteOne(query);

		res.send(result).status(200);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error deleting record');
	}
});
//_____________________________________________
///// Message Routes

export default router;
