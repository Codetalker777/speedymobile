import { all, takeLatest, put, call, fork, select } from 'redux-saga/effects';

import {
	SearchActionType,
	ActionAllOperatingSystems,
	ActionIosOperatingSystem,
	ActionAndroidOperatingSystem,
	ActionSetProviderText,
	ActionSetPhoneText,
	ActionUpdateResults
} from '../../actions/searchActions/searchInterface';
import axios from '../../utils/api';
import { ReactSelectArray } from '../../utils/localTypes';
import {
	setPhones as setPhonesRedux,
	setProvider as setProviderRedux,
	setContract as setContractRedux,
	basicSearch
} from '../../actions/searchActions/searchActions';
import {
	SetPhonesType,
	UpdateOperatingSystemType,
	UpdatePhonesType,
	UpdateProviderType,
	SetProviderType,
	InitialLoadType,
	SetContractType,
	SearchResponseType,
	GetDataType,
	SearchListener
} from './searchSagaTypes';

// this file makes api calls for the search results and additonal calls for options in choosing plans

// returns a list of all phones
const getPhones = (input: string[], phoneType?: string): Promise<string[]> => {
	return axios
		.get('/api/getPhones', { params: { providerName: input, phoneType } })
		.then(response => {
			return response.data.data;
		});
};

// returns a list of all plan types
const getContract = (): Promise<string[]> => {
	return axios.get('/api/getPlanType').then(response => {
		return response.data.data;
	});
};

// returns a list of all providers
const getProvider = (searchText: string | string[]): Promise<string[]> => {
	if (searchText[0] === 'Any') {
		return axios.get('/api/getProvider').then(response => {
			return response.data.data;
		});
	}
	return axios
		.get('/api/getProvider', { params: { phones: searchText } })
		.then(response => {
			return response.data.data;
		});
};

// the search api call
const apiCall = (action: ActionUpdateResults): Promise<SearchResponseType> => {
	let providers: string[];
	let contract: string[];
	// checks if any were chosen as criteria and creates an array
	if (action.providers && Array.isArray(action.providers)) {
		providers = action.providers.map(prov => prov.label);
	} else {
		providers = [];
	}
	if (action.contract && Array.isArray(action.contract)) {
		contract = action.contract.map(prov => prov.label);
	} else {
		contract = [];
	}
	return axios
		.get('/api/getData', {
			params: {
				data: action.data,
				minutes: action.minutes,
				messages: action.messages,
				monthly: action.monthly,
				upfront: action.upfront,
				providers,
				contract,
				criteria: action.criteria,
				searchText: action.searchText,
				page: action.page,
				operatingSystem: action.operatingSystem
			}
		})
		.then(response => {
			return response.data;
		});
};

// this saga returns the sorted array of search results that the user wanted based on search criteria
function* getData(action: ActionUpdateResults): GetDataType {
	const content: SearchResponseType = yield call(apiCall, action);
	yield put(basicSearch(content.data, content.searchNumber, content.similarResults));
}

// this saga returns a list of all phones
function* setPhones(
	action: ReactSelectArray | string,
	phoneType: string
): SetPhonesType {
	const providers: string[] = [];
	if (action && Array.isArray(action)) {
		for (let i = 0; i < action.length; i++) {
			providers.push(action[i].value);
		}
	}
	let content: string[];
	if (phoneType === '' || phoneType === undefined) {
		content = yield call(getPhones, providers);
	} else {
		content = yield call(getPhones, providers, phoneType);
	}
	yield put(setPhonesRedux(content));
}

// this saga returns  a list of all contract types
function* setContract(): SetContractType {
	const content: string[] = yield call(getContract);
	yield put(setContractRedux(content));
}

// this saga returns a list of all contracts
function* setProvider(searchText: string[]): SetProviderType {
	const content: string[] = yield call(getProvider, searchText);
	yield put(setProviderRedux(content));
}

function* updateProvider(action: ActionSetPhoneText): UpdateProviderType {
	const phones: string[] = [];
	if (action.value) {
		for (let i = 0; i < action.value.length; i++) {
			phones.push(action.value[i].value);
		}
	}
	yield call(setProvider, phones);
}

function* updatePhones(action: ActionSetProviderText): UpdatePhonesType {
	const operatingSystem: string = yield select(state => state.search.operatingSystem);
	yield call(setPhones, action.value, operatingSystem);
}

function* updateOperatingSystem(
	action:
		| ActionAllOperatingSystems
		| ActionIosOperatingSystem
		| ActionAndroidOperatingSystem
): UpdateOperatingSystemType {
	const providers: ReactSelectArray | string = yield select(
		state => state.search.providersText
	);
	if (action.type === SearchActionType.ANDROIDOS) {
		yield call(setPhones, providers, 'Android');
	} else if (action.type === SearchActionType.IOSOS) {
		yield call(setPhones, providers, 'iPhone');
	} else {
		yield call(setPhones, providers, '');
	}
}

export function* intialLoad(action: ActionUpdateResults): InitialLoadType {
	yield fork(getData, action);
	yield fork(setPhones, action.providers, action.os.operatingSystem);
	yield fork(setContract);
	yield fork(setProvider, action.searchText);
}

// main function that listens to action being triggered below
export default function* searchSaga(): SearchListener {
	yield all([
		yield takeLatest(SearchActionType.UPDATERESULTS, intialLoad),
		yield takeLatest(SearchActionType.PHONETEXT, updateProvider),
		yield takeLatest(SearchActionType.PROVIDERTEXT, updatePhones),
		yield takeLatest(
			[SearchActionType.ALLOS, SearchActionType.ANDROIDOS, SearchActionType.IOSOS],
			updateOperatingSystem
		)
	]);
}
