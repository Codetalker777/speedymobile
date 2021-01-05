import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { CheckoutTypes } from '../../actions/checkoutActions/checkoutInterface';
import axios from '../../utils/api';
import {
	setUnSubscribeStatus,
	setSubscribeStatus,
	orderResult
} from '../../actions/checkoutActions/checkoutActions';
import {
	RegisterSubscription,
	DeleteSubscription,
	PlaceOrder,
	CheckoutListener
} from './checkoutSagaTypes';
import { RootReducer } from '../../reducers';

/* this file is responsible for the checkout when placing an order for a phone and the subscribtion process */

// places an order
const callOrder = (data: RootReducer): Promise<boolean> => {
	return axios
		.post('/api/placeOrder', {
			data: data.cart.plans,
			cart: data.cart.cart,
			shippingType: data.checkout.deliveryType,
			shippingCost: data.checkout.deliveryCost,
			firstName: data.checkout.firstName,
			lastName: data.checkout.lastName,
			email: data.checkout.email,
			phoneNumber: data.checkout.phoneNumber,
			address: data.checkout.address,
			city: data.checkout.city,
			province: data.checkout.province,
			postalCode: data.checkout.postalCode,
			billingFirstName: data.checkout.billingFirstName,
			billingLastName: data.checkout.billingLastName,
			billingAddress: data.checkout.billingAddress,
			billingCity: data.checkout.billingCity,
			billingPostalCode: data.checkout.billingPostalCode,
			billingProvince: data.checkout.billingProvince
		})
		.then(response => {
			return response.data.success;
		});
};

// subscribes an email
const setSubscription = (data: string): Promise<boolean> => {
	return axios
		.post('/api/subscribe', {
			email: data
		})
		.then(response => {
			return response.data.success;
		});
};

// deletes a subscribtion
const sendDeleteSubscription = (data: string): Promise<boolean> => {
	return axios
		.delete('/api/unSubscribe', {
			data: { email: data }
		})
		.then(response => {
			return response.data.success;
		});
};

// saga places an order and updates state whether it was successful or not
function* placeOrder(): PlaceOrder {
	const data: RootReducer = yield select(state => state);

	const success: boolean = yield call(callOrder, data);

	if (success) {
		yield put(orderResult(false));
	} else {
		yield put(orderResult(true));
	}
}

// saga adds a subscribton
function* registerSubscription(): RegisterSubscription {
	const subscription: string = yield select(state => state.checkout.subscribe);

	yield call(setSubscription, subscription);
	yield put(setSubscribeStatus(true));
}

// saga deletes a subscribtion
function* deleteSubscription(): DeleteSubscription {
	const subscription: string = yield select(state => state.checkout.subscribe);
	yield call(sendDeleteSubscription, subscription);
	yield put(setUnSubscribeStatus(true));
}

// main listener for actions
export default function* checkoutSaga(): CheckoutListener {
	yield all([
		yield takeLatest(CheckoutTypes.PLACEORDER, placeOrder),
		yield takeLatest(CheckoutTypes.REGISTERSUBSCRIPTION, registerSubscription),
		yield takeLatest(CheckoutTypes.DELETESUBSCRIPTION, deleteSubscription)
	]);
}
