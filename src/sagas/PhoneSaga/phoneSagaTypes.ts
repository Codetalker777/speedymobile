import { CallEffect, PutEffect, ForkEffect, AllEffect } from 'redux-saga/effects';
import { PhonesByProvider } from '../../utils/dataTypes';
import { ActionSetPhonePlans } from '../../actions/phoneActions/phoneInterface';

export type GetPlansType = Generator<
	CallEffect<PhonesByProvider> | PutEffect<ActionSetPhonePlans>,
	void,
	PhonesByProvider
>;

export type PhoneListener = Generator<
	ForkEffect<never> | AllEffect<PhonesByProvider>,
	void,
	PhonesByProvider
>;
