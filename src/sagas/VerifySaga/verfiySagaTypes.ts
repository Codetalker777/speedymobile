import {
	CallEffect,
	PutEffect,
	SelectEffect,
	ForkEffect,
	AllEffect
} from 'redux-saga/effects';
import { ActionSetResult } from '../../actions/resetPasswordActions/resetPasswordInterface';
import { ActionVerfiyEmailSetResult } from '../../actions/verifyEmailActions/verifyEmailInterface';
import { ActionSetPopup } from '../../actions/messageActions/messageInterface';

export type VerifyEmailType = Generator<
	CallEffect<VerifyEmailResponseType> | PutEffect<ActionVerfiyEmailSetResult>,
	void,
	VerifyEmailResponseType
>;

export type VerifyPasswordType = Generator<
	CallEffect<VerifyResetLinkType> | PutEffect<ActionSetResult>,
	void,
	VerifyResetLinkType
>;

export type SubmitNewPasswordType = Generator<
	SelectEffect | CallEffect<VerifyPasswordResponseType> | PutEffect<ActionSetPopup>,
	void,
	string & VerifyPasswordResponseType
>;

export type VerifyEmailListenerType = Generator<
	| ForkEffect<never>
	| AllEffect<VerifyPasswordType | VerifyPasswordType | SubmitNewPasswordType>,
	void,
	VerifyEmailType & VerifyPasswordType & SubmitNewPasswordType
>;
export interface VerifyEmailResponseType {
	success: boolean;
	error?: string;
}

export interface VerifyPasswordResponseType {
	success: boolean;
	error?: string;
}

export interface VerifyResetLinkType {
	success: boolean;
	error?: string;
	id?: string;
}
