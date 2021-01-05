import {
	ResetPasswordTypes,
	AllResetPasswordActions
} from '../../actions/resetPasswordActions/resetPasswordInterface';
import { ResetPasswordState } from './resetPasswordTypes';
/* the state on app mount */
const intialState: ResetPasswordState = {
	loading: true,
	success: null,
	token: '',
	password: '',
	confirmPassword: ''
};

/* the following actions trigger changes in the state */

export default (
	state = intialState,
	action: AllResetPasswordActions
): ResetPasswordState => {
	switch (action.type) {
		case ResetPasswordTypes.SETPASSWORD:
			return { ...state, password: action.value };
		case ResetPasswordTypes.SETCONFIRMPASSWORD:
			return { ...state, confirmPassword: action.value };
		case ResetPasswordTypes.SETRESULT:
			return { ...state, loading: false, success: action.value, token: action.token };
		default:
			return state;
	}
};
