import {
	MessageTypes,
	AllMessageActions
} from '../../actions/messageActions/messageInterface';
import { MessageState, MessageTypeDef } from './messagesTypes';
/* the state on app mount */
const intialState: MessageState = {
	open: false,
	messageType: MessageTypeDef.INFO,
	message: ''
};

/* the following actions trigger changes in the state */

export default (state = intialState, action: AllMessageActions): MessageState => {
	switch (action.type) {
		case MessageTypes.SETPOPUP:
			return { open: true, messageType: action.messageType, message: action.message };
		case MessageTypes.CLEARPOPUP:
			return { ...state, open: false };
		default:
			return state;
	}
};
