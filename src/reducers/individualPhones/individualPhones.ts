import { IndividualPhoneState } from './individualPhoneTypes';
import {
	AllIndividualPhonesActions,
	IndividualPhoneTypes
} from '../../actions/individualPhoneActions/individualPhoneInterface';

const intialState: IndividualPhoneState = {
	phones: null,
	filteredPhones: null
};

/* the following actions trigger changes in the state */
export default (
	state = intialState,
	action: AllIndividualPhonesActions
): IndividualPhoneState => {
	switch (action.type) {
		case IndividualPhoneTypes.SETPHONES:
			return { ...state, phones: action.value, filteredPhones: action.value };
		case IndividualPhoneTypes.SETFILTER:
			return { ...state, filteredPhones: action.value };
		default:
			return { ...state };
	}
};
