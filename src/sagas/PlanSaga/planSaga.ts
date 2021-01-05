import { all, takeLatest, put, call } from 'redux-saga/effects';
import { ActionGetPlan, PlanTypes } from '../../actions/planActions/planInterface';
import axios from '../../utils/api';
import { Plan } from '../../utils/dataTypes';
import { setPlan } from '../../actions/planActions/planActions';
import { PlanListener, GetSelectedPlanType } from './planSagaTypes';

/* listens to all actions that pertain to the plan details page */

// list of phones based on the plan chosen
const getPlan = (slug: string): Promise<Plan> => {
	return axios
		.post<Plan>('/api/getSinglePlan', {
			planName: slug
		})
		.then(response => {
			return response.data;
		});
};

export function* getSelectedPlan(action: ActionGetPlan): GetSelectedPlanType {
	try {
		console.log('HERE', action.value);
		const plan: Plan = yield call(getPlan, action.value);
		yield put(setPlan(plan));
	} catch (error) {
		console.error('Failed to download plan', error.message);
	}
}

export default function* planSaga(): PlanListener {
	yield all([yield takeLatest(PlanTypes.GETPLAN, getSelectedPlan)]);
}
