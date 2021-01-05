import { all, takeLatest, put, call, select } from 'redux-saga/effects';
import { FeedbackTypes } from '../../actions/feedbackActions/feedbackInterface';
import axios from '../../utils/api';
import { FeedbackState } from '../../reducers/feedback/feedbackTypes';
import { resetFeedBack } from '../../actions/feedbackActions/feedbackActions';
import { SendFeedBack, FeedBackListener } from './feedbackSagaTypes';

const axiosSendFeedback = (input: FeedbackState): Promise<boolean> => {
	return axios
		.post('/api/feedback', {
			valueNextPurchase: input.valueNextPurchase,
			somethingMissing: input.somethingmissing,
			recommend: input.recommend,
			development: input.development
		})
		.then(response => {
			return response.data.success;
		});
};

function* sendFeedBack(): SendFeedBack {
	const data: FeedbackState = yield select(state => state.feedback);
	yield call(axiosSendFeedback, data);
	yield put(resetFeedBack());
}

export default function* feedbackSaga(): FeedBackListener {
	yield all([yield takeLatest(FeedbackTypes.SUBMIT, sendFeedBack)]);
}
