/* Main file that runs on our backend. This file imports all the routes and serves them using Express.js
It also servers all the images stores in the images folder. Additionally it runs a job call mailing list using CRON.
*/

// Env variables

import { config } from 'dotenv';
import express from 'express';

// routes for http requests
import cors from 'cors';
import loginRoute from './Routes/login';
import dataRoute from './Routes/data';
import phoneRoute from './Routes/phone';
import orderRoute from './Routes/order';
import subscribeRoute from './Routes/subscribe';
import feedbackRoute from './Routes/feedback';
import ContactRoute from './Routes/contact';
import IndividualPhonesRoute from './Routes/IndividualPhones';
import PlansRoute from './Routes/plans';

config();

const app = express();
app.use(cors());
app.use(express.static('images/phones'));
app.use(express.static('images/logos'));

// append /api for our http requests
app.use(
	'/api',
	phoneRoute,
	dataRoute,
	orderRoute,
	subscribeRoute,
	feedbackRoute,
	loginRoute,
	ContactRoute,
	IndividualPhonesRoute,
	PlansRoute
);

export default app;
