/* This file controls the http requests for unsubcribing and subsribing to the mailing list. It uses nodemailer
and Google OAuth to accomplish this
*/

// env variables
// Sets up a express js router
import express from 'express';
import { config } from 'dotenv';
import emailingService from '../Services/emailingService';

import Subscribe from '../Schemas/subscribe';

config();

const subscribeRoute = express.Router();

// A new subscription is made, email is passed in the body
subscribeRoute.post('/subscribe', async (req, res) => {
	const subscribe = new Subscribe();

	const { email } = req.body;

	subscribe.email = email;

	// save email to database and send email to let user know that they subscribed
	subscribe.save(err => {
		// db failed to add email, let frontend know
		if (err) {
			return res.json({ success: false, error: err });
		}
		// information that goes into the email
		const mailOptions = {
			from: '"SpeedyMobile" <info@speedymobile.ca>',
			to: email,
			subject: 'Welcome to the SpeedyMobile Subscription',
			html:
				"<div><p>Thank you for subscribing.</p><a href='https://www.speedymobile.ca/UnSubscribe'>Unsubscribe</a></div>"
		};
		const response = emailingService.sendMail(mailOptions);

		if (response) {
			return res.json({ success: true });
		}
		return res.json({ success: true, error: 'Email failure' });
	});
});

// delete email from database upon user request
subscribeRoute.delete('/unSubscribe', (req, res) => {
	const { email } = req.body;
	// db call to search and delete specific email, return true on sucess, false on failure with error
	Subscribe.deleteOne({ email }, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

export default subscribeRoute;
