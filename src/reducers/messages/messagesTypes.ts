export enum MessageTypeDef {
	INFO = 'info',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error'
}

export type MessageState = {
	open: boolean;
	messageType: MessageTypeDef;
	message: string;
};
