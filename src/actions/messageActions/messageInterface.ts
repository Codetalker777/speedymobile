import { MessageTypeDef } from '../../reducers/messages/messagesTypes';

export enum MessageTypes {
	SETPOPUP = 'MESSAGES/SETPOPUP',
	CLEARPOPUP = 'MESSAGES/CLEARPOPUP'
}

export interface ActionSetPopup {
	type: MessageTypes.SETPOPUP;
	messageType: MessageTypeDef;
	message: string;
}

export interface ActionClearPopup {
	type: MessageTypes.CLEARPOPUP;
}

export type AllMessageActions = ActionSetPopup | ActionClearPopup;
