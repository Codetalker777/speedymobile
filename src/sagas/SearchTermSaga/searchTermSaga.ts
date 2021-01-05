import { all, takeLeading, put, call } from 'redux-saga/effects';
import { TopNavSearchTypes } from '../../actions/topNavSearchActions/topNavSearchInterface';
import { IndividualPhone } from '../../utils/dataTypes';
import axios from '../../utils/api';
import { topNavSearchActions } from '../../actions/topNavSearchActions/topNavSearchActions';
import { GetSearchTermsType, SearchTermListener } from './searchTermSagaTypes';

const searchTermsApi = (): Promise<IndividualPhone[]> => {
	return axios.post('/api/navBarSearch').then(response => {
		if (response?.data?.success) {
			return response.data.data;
		}
		console.error('Unable to download search terms');
		return [];
	});
};

function* getSearchTerms(): GetSearchTermsType {
	try {
		const result: IndividualPhone[] = yield call(searchTermsApi);
		yield put(topNavSearchActions.setSearchTerms(result));
	} catch (error) {
		console.error('Failed to add search terms', error.message);
	}
}

export default function* searchTermSaga(): SearchTermListener {
	yield all([yield takeLeading(TopNavSearchTypes.GETSEARCHTERMS, getSearchTerms)]);
}
