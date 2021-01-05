import {
	SelectEffect,
	CallEffect,
	PutEffect,
	ForkEffect,
	AllEffect
} from 'redux-saga/effects';
import { ActionResetFeedback } from '../../actions/feedbackActions/feedbackInterface';
import { FeedbackState } from '../../reducers/feedback/feedbackTypes';

export type SendFeedBack = Generator<
	SelectEffect | CallEffect<boolean> | PutEffect<ActionResetFeedback>,
	void,
	FeedbackState
>;

export type FeedBackListener = Generator<
	ForkEffect<never> | AllEffect<FeedbackState>,
	void,
	FeedbackState
>;
