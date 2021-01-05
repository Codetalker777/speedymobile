import { ContactTypes, ActionSendContactForm } from './contactInterface';

// Subscribition Actions
export const sendContactForm = (
	name: string,
	phoneNumber: string,
	email: string,
	message: string
): ActionSendContactForm => ({
	type: ContactTypes.SENDCONTACTFORM,
	name,
	phoneNumber,
	email,
	message
});
