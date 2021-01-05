import { CallEffect, PutEffect, ForkEffect, AllEffect } from 'redux-saga/effects';
import { Data, IndividualPhone, Plan } from '../../utils/dataTypes';
import { ActionSetCartItem } from '../../actions/cartActions/cartInterface';

export type GetPlans = Generator<
	PutEffect<ActionSetCartItem> | CallEffect<IndividualPhone[] | Plan[]>,
	void,
	IndividualPhone[] & Plan[]
>;

export type CartListener = Generator<
	ForkEffect<never> | AllEffect<Data[]>,
	void,
	Data[]
>;
