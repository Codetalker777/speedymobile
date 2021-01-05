import { all, takeLatest, put, call } from 'redux-saga/effects';
import axios from '../../utils/api';
import {
	PhonesTypes,
	ActionGetPhonePlans
} from '../../actions/phoneActions/phoneInterface';
import { IndividualPhone } from '../../utils/dataTypes';
import { setPhone } from '../../actions/phoneActions/phoneActions';
import { GetPlansType, PhoneListener } from './phoneSagaTypes';

/* holds all the api call for the cart page in the app */

// api call retrieves all data associated with those ids in array or single value
const datafind = (slug: string): Promise<IndividualPhone> => {
	return axios
		.post<IndividualPhone>('/api/getSinglePhone', {
			phoneName: slug
		})
		.then(response => {
			return response.data;
		});
};

export function* getPhone(action: ActionGetPhonePlans): GetPlansType {
	const result: IndividualPhone = yield call(datafind, action.slug);
	yield put(setPhone(result));
}

// main listener function
export default function* phoneSaga(): PhoneListener {
	yield all([yield takeLatest(PhonesTypes.GETPHONEPLANS, getPhone)]);
}
