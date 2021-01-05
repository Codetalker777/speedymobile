import { all, takeLatest, put, call } from 'redux-saga/effects';
import axios from '../../utils/api';

import {
	CartActionType,
	ActionGetCartItem
} from '../../actions/cartActions/cartInterface';
import { CartType, IndividualPhone, Plan } from '../../utils/dataTypes';
import { GetPlans, CartListener } from './cartSagaTypes';
import { setCartItems } from '../../actions/cartActions/cartActions';

/* holds all the api call for the cart page in the app */

// checks if an object is empty
function isEmpty(obj?: CartType): boolean {
	if (typeof obj === 'object' && Object.entries(obj).length !== 0) {
		return false;
	}
	return true;
}

const phoneAPI = (phoneSlugs: string[]): Promise<IndividualPhone[]> => {
	return axios
		.post<IndividualPhone[]>('/api/getMultiPhone', {
			phoneNames: phoneSlugs
		})
		.then(response => {
			return response.data;
		});
};

const planAPI = (planSlugs: string[]): Promise<Plan[]> => {
	return axios
		.post<Plan[]>('/api/getMultiPlans', {
			planNames: planSlugs
		})
		.then(response => {
			return response.data;
		});
};

// saga retrieves plans associatwd with ids
export function* getPlans(action: ActionGetCartItem): GetPlans {
	if (isEmpty(action.value)) {
		yield put(setCartItems([], []));
	} else {
		const phones: IndividualPhone[] = yield call(
			phoneAPI,
			Object.keys(action.value.phones)
		);
		const plans: Plan[] = yield call(planAPI, Object.keys(action.value.plans));
		yield put(setCartItems(phones, plans));
	}
}

// main listener function
export default function* cartSaga(): CartListener {
	yield all([yield takeLatest(CartActionType.GETCARTITEMS, getPlans)]);
}
