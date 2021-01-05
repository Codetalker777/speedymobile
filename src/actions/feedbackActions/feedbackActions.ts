import {
	FeedbackTypes,
	ActionChangeDevelopment,
	ActionChangeMissing,
	ActionChangeRecommend,
	ActionChangeValue,
	ActionResetFeedback,
	ActionSendFeedback
} from './feedbackInterface';

/* This file holds all the checkout actions */

// Subscribition Actions
export const changeValue = (value: string): ActionChangeValue => ({
	type: FeedbackTypes.VALUE,
	value
});

export const changeMissing = (value: string): ActionChangeMissing => ({
	type: FeedbackTypes.MISSING,
	value
});

export const changeRecommend = (value: string): ActionChangeRecommend => ({
	type: FeedbackTypes.RECOMMEND,
	value
});

export const changeDevelopment = (value: string): ActionChangeDevelopment => ({
	type: FeedbackTypes.DEVELOPMENT,
	value
});

export const resetFeedBack = (): ActionResetFeedback => ({
	type: FeedbackTypes.RESET
});

export const sendFeedBack = (): ActionSendFeedback => ({
	type: FeedbackTypes.SUBMIT
});
