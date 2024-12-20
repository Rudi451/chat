import express from 'express';
import cors from 'cors';
import resourcesRouter from './routes/resource-routes.js';

import * as dotenv from 'dotenv';
import {CentralErrorHandler} from './middleware/centralErrorHandler.js';

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/resources', resourcesRouter);

// app.use(CentralErrorHandler);
app.use(CentralErrorHandler);
// start the Express server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
