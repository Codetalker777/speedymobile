import {
	VerifyEmailTypes,
	AllVerifyEmailActions
} from '../../actions/verifyEmailActions/verifyEmailInterface';
import { VerifyEmailState } from './verifyEmailTypes';
/* the state on app mount */
const intialState: VerifyEmailState = {
	loading: true,
	success: null
};

/* the following actions trigger changes in the state */

export default (
	state = intialState,
	action: AllVerifyEmailActions
): VerifyEmailState => {
	switch (action.type) {
		case VerifyEmailTypes.SETRESULT:
			return { loading: false, success: action.value };
		default:
			return state;
	}
};
