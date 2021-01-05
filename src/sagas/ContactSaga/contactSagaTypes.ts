import { CallEffect, ForkEffect, AllEffect, PutEffect } from 'redux-saga/effects';
import { ActionSetPopup } from '../../actions/messageActions/messageInterface';

export type contactFormType = Generator<
	| CallEffect<{
			success: boolean;
			error?: string | undefined;
	  }>
	| PutEffect<ActionSetPopup>,
	void,
	{
		success: boolean;
		error?: string | undefined;
	}
>;

export type ContactListener = Generator<ForkEffect<never> | AllEffect<any>, void, any>;
