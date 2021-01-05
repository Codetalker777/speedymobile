// environment variables
import { config } from 'dotenv';
import schedule from 'node-schedule';
import { createObjectCsvWriter } from 'csv-writer';
import Feedback from '../Schemas/feedback';
import emailingService from './emailingService';

config();

const csvWriter = createObjectCsvWriter({
	path: 'report.csv',
	header: [
		{ id: 'valueNextPurchase', title: 'Value in Next Purchase' },
		{ id: 'somethingMissing', title: 'Something Missing' },
		{ id: 'recommend', title: 'Recommend to Friend' },
		{ id: 'development', title: 'Additonal Information' },
		{ id: 'time', title: 'Date' }
	]
});

async function sendFeedBack() {
	// email body
	const mailOptions = {
		from: '"SpeedyMobile" <info@speedymobile.ca>',
		to: 'speedymobile@gmail.com',
		subject: 'SpeedyMobile Feedback',
		html: '<div><p>Daily Feedback</p><div>',
		attachments: [{ filename: 'report.csv', path: 'report.csv' }]
	};

	// send email and log the result
	const response = emailingService.sendMail(mailOptions);
	if (response) {
		return true;
	}
	return false;
}

// job is scheduled
export default schedule.scheduleJob('0 0 22 * * *', function job() {
	// retrives the mailing list
	Feedback.find({}, function response(err, data) {
		if (err) {
			console.error('failed to retrieve feedback');
		} else {
			let output = JSON.stringify(data);
			output = JSON.parse(output);
			for (let i = 0; i < output.length; i++) {
				output[i].time = data[i].time.toLocaleDateString('en-US', {
					hour12: false,
					year: '2-digit',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit'
				});
			}
			csvWriter
				.writeRecords(output) // returns a promise
				.then(() => {
					if (sendFeedBack()) {
						console.log('success');
					} else {
						console.error('failed');
					}
				});
		}
	});
});
