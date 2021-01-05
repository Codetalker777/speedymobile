import {
	CompareTypes,
	AllCompareActions
} from '../../actions/comparePhonesActions/comparePhonesInterface';
import { CompareState } from './comparePhonesTypes';
import { IndividualPhone } from '../../utils/dataTypes';
/* the state on app mount */
const intialState: CompareState = {
	comparePhonesList: []
};

/* the following actions trigger changes in the state */
export default (state = intialState, action: AllCompareActions): CompareState => {
	switch (action.type) {
		case CompareTypes.ADD: {
			if (state.comparePhonesList.length < 3) {
				return { comparePhonesList: state.comparePhonesList.concat(action.value) };
			}

			const newarray = state.comparePhonesList;
			if (state.comparePhonesList.length < 3) {
				newarray.shift();
				newarray.push(action.value);
			}
			return { comparePhonesList: newarray };
		}
		case CompareTypes.REMOVE: {
			const newarray: Array<IndividualPhone> = JSON.parse(JSON.stringify(state.comparePhonesList));
			newarray.splice(action.value, 1);
			return { comparePhonesList: newarray };
		}
		default:
			return { ...state };
	}
};
