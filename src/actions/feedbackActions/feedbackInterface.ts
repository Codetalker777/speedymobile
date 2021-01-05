export enum FeedbackTypes {
	VALUE = 'FEEDBACK/VALUE',
	MISSING = 'FEEDBACK/MISSING',
	RECOMMEND = 'FEEDBACK/RECOMMEND',
	DEVELOPMENT = 'FEEDBACK/DEVELOPMENT',
	RESET = 'FEEDBACK/RESET',
	SUBMIT = 'FEEDBACK/SUBMIT'
}

export interface ActionChangeValue {
	type: FeedbackTypes.VALUE;
	value: string;
}

export interface ActionChangeMissing {
	type: FeedbackTypes.MISSING;
	value: string;
}

export interface ActionChangeRecommend {
	type: FeedbackTypes.RECOMMEND;
	value: string;
}

export interface ActionChangeDevelopment {
	type: FeedbackTypes.DEVELOPMENT;
	value: string;
}

export interface ActionResetFeedback {
	type: FeedbackTypes.RESET;
}

export interface ActionSendFeedback {
	type: FeedbackTypes.SUBMIT;
}

export type AllFeedbackActions =
	| ActionChangeDevelopment
	| ActionChangeMissing
	| ActionChangeRecommend
	| ActionChangeValue
	| ActionResetFeedback
	| ActionSendFeedback;
