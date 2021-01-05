import { PlanTypes, AllPlanActions } from '../../actions/planActions/planInterface';
import { PlanState } from './plansTypes';

/* contains all the definition for all of the variables used in the plan details page */

/* the state on app mount */
const intialState: PlanState = {
	loading: true,
	plan: null
};

/* the following actions trigger changes in the state */
export default (state = intialState, action: AllPlanActions): PlanState => {
	switch (action.type) {
		case PlanTypes.RESET:
			return { ...intialState };
		case PlanTypes.SETPLAN:
			return { ...state, loading: false, plan: action.value };
		default:
			return { ...state };
	}
};
