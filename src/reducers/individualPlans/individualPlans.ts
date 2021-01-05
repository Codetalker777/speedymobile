import { IndividualPlanState } from './individualPlanTypes';
import {
	IndividualPlanTypes,
	AllIndividualPlanActions
} from '../../actions/individualPlanActions/individualPlanInterface';

const intialState: IndividualPlanState = {
	plans: null,
	filteredPlans: null
};

/* the following actions trigger changes in the state */
export default (
	state = intialState,
	action: AllIndividualPlanActions
): IndividualPlanState => {
	switch (action.type) {
		case IndividualPlanTypes.SETPLANS:
			return { ...state, plans: action.value, filteredPlans: action.value };
		case IndividualPlanTypes.SETFILTER:
			return { ...state, filteredPlans: action.value };
		default:
			return { ...state };
	}
};
