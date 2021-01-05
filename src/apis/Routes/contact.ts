import { config } from 'dotenv';
import express from 'express';
import isEmpty from 'is-empty';
import emailingService from '../Services/emailingService';

config();

/**
 * Validates emails to ensure that they are valid
 * @param email
 */
function validateEmail(email: string): boolean {
	const re = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

/**
 * Returns a html paragraph with a phone number if it exists
 * @param phoneNumber
 */
function includePhoneNumber(phoneNumber?: string): string {
	if (phoneNumber) {
		return `<p>Phone Number: ${phoneNumber}</p>`;
	}
	return '';
}

const ContactRoute = express.Router();

// Contact Form submission
ContactRoute.post('/Contact', (req, res) => {
	const { name, email, phoneNumber, message } = req.query;
	try {
		if (isEmpty(name)) {
			return res.json({ success: false, error: 'No name entered' });
		}
		if (!validateEmail(email.toString())) {
			return res.json({ success: false, error: 'Invalid email' });
		}
		if (isEmpty(message)) {
			return res.json({ success: false, error: 'No message entered' });
		}
		const mailOptions = {
			from: '"SpeedyMobile" <info@speedymobile.ca>',
			to: email.toString(),
			bbc: 'info@speedymobile.ca',
			subject: 'Thank for for Contacting Us!',
			html: `<div><p>Hello ${name.toString()},</p><p>Thank you for contacting us! Someone from our team will get back to your message below!</p>${includePhoneNumber(
				phoneNumber?.toString()
			)}<p>${message}</p></div>`
		};
		const response = emailingService.sendMail(mailOptions);
		if (response) {
			return res.json({ success: true });
		}
		return res.json({ success: true, error: 'Failed to send the contact form email' });
	} catch (error) {
		console.error(error.message);
		return res.json({ success: false, error: `Api failed: ${error.message}` });
	}
});

export default ContactRoute;
