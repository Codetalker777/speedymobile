// This file sends a newsletter to subscribers every friday at 6pm.

// environment variables
import schedule from 'node-schedule';
import { config } from 'dotenv';
import emailingService from './emailingService';
import Subscribe from '../Schemas/subscribe';

config();

// this function converts the emails from an array of objects to an array with strings
const getMailArray = emailObjects => {
	const emailArray = [];
	for (let i = 0; i < emailObjects.length; i++) {
		emailArray.push(emailObjects[i].email);
	}
	return emailArray;
};

// this functions sends emails to all subsribers in the array. If one email were to failed the others would still go through
async function sendNewsletter(emails) {
	// email body
	const mailOptions = {
		from: '"SpeedyMobile" <info@speedymobile.ca>',
		to: emails,
		subject: 'SpeedyMobile Subscription Newsletter',
		html: '<div><p>Here is the weekly newsletter</p><div>'
	};

	// send email and log the result
	const response = emailingService.sendMail(mailOptions);
	if (response) {
		return true;
	}
	return false;
}

// job is scheduled
export default schedule.scheduleJob('0 0 18 * * 5', function job() {
	// retrives the mailing list
	Subscribe.find({}, function response(err, emails) {
		if (err) {
			console.error('failed to retrieve mailing list');
		} else {
			// obtains array of emails
			const emailArray = getMailArray(emails);
			// sends emails to subscribers
			if (sendNewsletter(emailArray)) {
				console.log('success');
			} else {
				console.error('failed');
			}
		}
	});
});
