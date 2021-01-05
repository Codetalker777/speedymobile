import {
	SelectEffect,
	CallEffect,
	PutEffect,
	ForkEffect,
	AllEffect
} from 'redux-saga/effects';
import {
	ActionSetSubscribeStatus,
	ActionSetUnSubscribeStatus,
	ActionOrderResult
} from '../../actions/checkoutActions/checkoutInterface';
import { RootReducer } from '../../reducers';

export type PlaceOrder = Generator<
	SelectEffect | CallEffect<boolean> | PutEffect<ActionOrderResult>,
	void,
	RootReducer & boolean
>;

export type RegisterSubscription = Generator<
	SelectEffect | CallEffect<boolean> | PutEffect<ActionSetSubscribeStatus>,
	void,
	string
>;

export type DeleteSubscription = Generator<
	SelectEffect | CallEffect<boolean> | PutEffect<ActionSetUnSubscribeStatus>,
	void,
	string
>;

export type CheckoutListener = Generator<
	ForkEffect<never> | AllEffect<PlaceOrder | RegisterSubscription | DeleteSubscription>,
	void,
	RootReducer & string & boolean
>;
