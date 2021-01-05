import { MessageTypeDef } from '../../reducers/messages/messagesTypes';
import { MessageTypes, ActionClearPopup, ActionSetPopup } from './messageInterface';

/* this file contains all the actions for the cart page */

export const messageActions = {
	setPopup: (message: string, messageType: MessageTypeDef): ActionSetPopup => {
		if (typeof window !== 'undefined') {
			window?.zE('webWidget', 'hide');
		}
		return {
			type: MessageTypes.SETPOPUP,
			messageType,
			message
		};
	},
	clearPopup: (): ActionClearPopup => ({
		type: MessageTypes.CLEARPOPUP
	})
};
