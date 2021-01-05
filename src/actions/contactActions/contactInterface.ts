export enum ContactTypes {
	SENDCONTACTFORM = 'CONTACT/SENDCONTACTFORM'
}

export interface ActionSendContactForm {
	type: ContactTypes.SENDCONTACTFORM;
	name: string;
	phoneNumber: string;
	email: string;
	message: string;
}
