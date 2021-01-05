/* Main file that runs on our backend. This file imports all the routes and serves them using Express.js
It also servers all the images stores in the images folder. Additionally it runs a job call mailing list using CRON.
*/

// Env variables
import cluster from 'cluster';

import { config } from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import clientServer from './clientServer/server';
import backendServer from './apis/backendServer';

config();

const Store = MongoStore(session);

// master thread
if (cluster.isMaster) {
	// gets amount of cpus
	const cpuCount = process.env.WEB_CONCURRENCY || 1;
	const clusterMap = {};
	// makes enough processes for each cpu
	for (let i = 0; i < cpuCount; i += 1) {
		const worker = cluster.fork({ workerId: i });
		clusterMap[worker.id] = i;

		if (clusterMap[worker.id] === 0) {
			// first process is tasked with sending subscription emails
			const taskArg = { task: 'Subscription', message: 'Tasked with Sending Emails' };
			worker.send(taskArg);
		}
	}

	cluster.on('online', function intial(worker) {
		console.log('Worker', worker.process.pid, 'is online');
	});
	// makes another process when a worker fails
	cluster.on('exit', function replaceWorker(worker, code, signal) {
		console.log(
			'Worker',
			worker.process.pid,
			'died with code:',
			code,
			'and with signal:',
			signal
		);
		if (clusterMap[worker.id] === 0) {
			const newProcess = cluster.fork({ workerId: 0 });
			const taskArg = { task: 'Subscription', message: 'Tasked with Sending Emails' };
			newProcess.send(taskArg);
			clusterMap[newProcess.id] = 0;
		} else {
			cluster.fork();
		}
	});
	// jobs
	// require('./Routes/mailingList');
} else {
	process.on('message', msg => {
		console.log(process.pid, msg.message);
		// require('./apis/Routes/mailingList');
		// require('./apis/Routes/sendfeedback');
	});
	// one instance of the server
	// node modules required
	// checks if a port enivronment variable exists otherwise default to 3000
	const API_PORT = process.env.PORT || 3000;
	const app = express();

	// allows external http requests
	app.use(cors());
	// this is our MongoDB database
	const dbRoute = process.env.DB_ROUTE;

	// connects our back end code with the database
	mongoose.connect(dbRoute, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	const db = mongoose.connection;
	app.use(
		session({
			secret: "Laurentius's login",
			resave: false,
			saveUninitialized: false,
			store: new Store({ mongooseConnection: db })
		})
	);
	app.use(compression());

	db.once('open', () => console.log('connected to the database'));

	// checks if connection with the database is successful
	db.on('error', console.error.bind(console, 'MongoDB connection error:'));

	// (optional) only made for logging and
	// bodyParser, parses the request body to be a readable json format
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(logger('dev'));

	app.use(clientServer, backendServer);

	if (process.env.NODE_ENV === 'development') {
		const reload = require('reload');
		app.set('port', process.env.PORT || 3000);
		const server = http.createServer(app);
		reload(app)
			.then(function (reloadReturned) {
				// reloadReturned is documented in the returns API in the README

				// Reload started, start web server
				server.listen(app.get('port'), function () {
					console.log(`Web server listening on port ${app.get('port')}`);
				});
			})
			.catch(function (error) {
				console.error(
					'Reload could not start, could not start server/sample app',
					error
				);
			});
	} else {
		app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
	}
}
