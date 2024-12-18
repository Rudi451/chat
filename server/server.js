import express from 'express';
import cors from 'cors';
import resourcesRouter from './routes/resource-routes.js';

import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/resources', resourcesRouter);

// start the Express server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
