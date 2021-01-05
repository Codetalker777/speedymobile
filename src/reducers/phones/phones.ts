import { Reset, SearchActionType } from '../../actions/searchActions/searchInterface';
import { PhonesTypes, AllPhoneTypes } from '../../actions/phoneActions/phoneInterface';
import { PhonesState } from './phonesTypes';

/* contains all the definition for all of the variables used in the plan details page */

/* the state on app mount */
const intialState: PhonesState = {
	data: null,
	loading: true
};

/* the following actions trigger changes in the state */
export default (state = intialState, action: Reset | AllPhoneTypes): PhonesState => {
	switch (action.type) {
		case PhonesTypes.SETPHONEPLANS:
			return {
				data: action.value,
				loading: false
			};
		case SearchActionType.RESET:
			return {
				...intialState
			};
		default:
			return { ...state };
	}
};
