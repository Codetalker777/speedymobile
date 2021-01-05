import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();

const EmailingService = function emailingService() {
	const self = this;

	// sending mail to recipients
	self.sendMail = async function sendMail(mailOptions) {
		const transporter = nodemailer.createTransport({
			host: 'smtp.zoho.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.ZOHO_USER,
				pass: process.env.ZOHO_PASSWORD
			}
		});
		await transporter.sendMail(mailOptions, function response(err, info) {
			if (err) {
				console.log(err);
				return false;
			}
			console.log(info);
			return true;
		});
	};
};

export default new EmailingService();
