import express from 'express';

import resourcesRouter from './routes/resource-routes.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {CentralErrorHandler} from './middleware/centralErrorHandler.js';
import serverSetup from './middleware/serverSetup.js';
import path from 'path';

// const ENV_PATH = path.join(process.cwd(), '.env');
// console.log('env path: ', ENV_PATH);
// dotenv.config({path: ENV_PATH});
dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();
app.use(cors());
app.use(serverSetup);

app.use(express.json());

app.use('/api/resources', resourcesRouter);

//middleware for correct display of Server-Error Responses
app.use(CentralErrorHandler);

// start the Express server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
