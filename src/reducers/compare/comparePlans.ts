import {
	CompareTypes,
	AllCompareActions
} from '../../actions/comparePlansActions/comparePlansInterface';
import { CompareState } from './compareTypes';
import { Plan } from '../../utils/dataTypes';
/* the state on app mount */
const intialState: CompareState = {
	comparePlansList: []
};

/* the following actions trigger changes in the state */
export default (state = intialState, action: AllCompareActions): CompareState => {
	switch (action.type) {
		case CompareTypes.ADD: {
			if (state.comparePlansList.length < 3) {
				return { comparePlansList: state.comparePlansList.concat(action.value) };
			}

			const newarray = state.comparePlansList;
			if (state.comparePlansList.length < 3) {
				newarray.shift();
				newarray.push(action.value);
			}
			return { comparePlansList: newarray };
		}
		case CompareTypes.REMOVE: {
			const newarray: Array<Plan> = JSON.parse(JSON.stringify(state.comparePlansList));
			newarray.splice(action.value, 1);
			return { comparePlansList: newarray };
		}
		default:
			return { ...state };
	}
};
