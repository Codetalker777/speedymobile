import { all, takeLatest, put, fork, call } from 'redux-saga/effects';
import { MainTypes, ActionSetTab } from '../../actions/actions/actionInterface';
import searchSaga from '../SearchSaga/searchSaga';
import planSaga from '../PlanSaga/planSaga';
import cartSaga from '../CartSaga/cartSaga';
import checkoutSaga from '../CheckoutSaga/checkoutSaga';
import phoneSaga from '../PhoneSaga/phoneSaga';
import feedbackSaga from '../FeedbackSaga/feedbackSaga';
import authSaga from '../AuthSaga/authSaga';
import verifySaga from '../VerifySaga/verifySaga';
import newsSaga from '../NewsSaga/newsSaga';
import searchTermSaga from '../SearchTermSaga/searchTermSaga';
import contactSaga from '../ContactSaga/contactSaga';
import axios from '../../utils/api';
import { Data, IndividualPhone, Plan } from '../../utils/dataTypes';
import { updateSearchField, mainLoadedTopPlans } from '../../actions/actions/actions';
import { setCriteria } from '../../actions/searchActions/searchActions';
import {
	GetSearchDataType,
	GetSearchTypeDefiniton,
	GetTopPlansType,
	RootListener,
	GetPhonesCarosuelType,
	GetPlansCarosuelType
} from './rootSagaTypes';
import { setPhones } from '../../actions/individualPhoneActions/individualPhoneActions';
import { IndividualPhoneTypes } from '../../actions/individualPhoneActions/individualPhoneInterface';
import { IndividualPlanTypes } from '../../actions/individualPlanActions/individualPlanInterface';
import { setPlans } from '../../actions/individualPlanActions/individualPlanActions';

// this file serves as all the api calls for the main page and the main listener saga.

// returns the data recieved from the backend from the top plans api call
const retrievePlans = (): Promise<Data[]> => {
	return axios.get('/api/getTopPlans', {}).then(response => {
		return response.data.data;
	});
};

// checks what tab you are on and based on that it returns all iPhones, Androids or plan types as the response
const getValues = (tab: number): Promise<string[]> => {
	if (tab === 0) {
		return axios
			.get('/api/getPhones', {
				params: {
					phoneType: 'iPhone'
				}
			})
			.then(response => {
				return response.data.data;
			});
	}
	if (tab === 1) {
		return axios
			.get('/api/getPhones', {
				params: {
					phoneType: 'Android'
				}
			})
			.then(response => {
				return response.data.data;
			});
	}
	return axios.get('/api/getPlanType').then(response => {
		return response.data.data;
	});
};

const getPhonesApi = (): Promise<IndividualPhone[]> => {
	return axios.post<IndividualPhone[]>('/api/getListPhones').then(response => {
		return response.data;
	});
};

const getPlansApi = (): Promise<Plan[]> => {
	return axios.post<Plan[]>('/api/getListPlans').then(response => {
		return response.data;
	});
};

// this saga populates the search field with what you trying to search for based on the tab
function* getSearchData(action: ActionSetTab): GetSearchDataType {
	const response: string[] = yield call(getValues, action.value);
	yield put(updateSearchField(response));
}

// Sets the type of search to either phones or plans based on the tab chosen
function* getSearchType(action: ActionSetTab): GetSearchTypeDefiniton {
	if (action.value === 0 || action.value === 1) {
		yield put(setCriteria('Phones'));
	} else {
		yield put(setCriteria('Plans'));
	}
}

// this function returns a list of the top plans
function* getTopPlans(): GetTopPlansType {
	const response: Data[] = yield call(retrievePlans);
	yield put(mainLoadedTopPlans(response));
}

export function* getPhones(): GetPhonesCarosuelType {
	const response: IndividualPhone[] = yield call(getPhonesApi);
	yield put(setPhones(response));
}

export function* getPlans(): GetPlansCarosuelType {
	const response: Plan[] = yield call(getPlansApi);
	yield put(setPlans(response));
}

/* main saga, it listens to latest requests for the first 3 sagas and it also creates a seperate thread for the other
 sagas in other files */
export default function* mySaga(): RootListener {
	yield all([
		yield takeLatest(MainTypes.SETTAB, getSearchData),
		yield takeLatest(MainTypes.SETTAB, getSearchType),
		yield takeLatest(MainTypes.GETMAINTOPPLANS, getTopPlans),
		yield takeLatest(IndividualPhoneTypes.GETPHONES, getPhones),
		yield takeLatest(IndividualPlanTypes.GETPLANS, getPlans),
		fork(searchSaga),
		fork(planSaga),
		fork(cartSaga),
		fork(checkoutSaga),
		fork(phoneSaga),
		fork(feedbackSaga),
		fork(authSaga),
		fork(verifySaga),
		fork(newsSaga),
		fork(searchTermSaga),
		fork(contactSaga)
	]);
}
