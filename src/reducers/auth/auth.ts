import { AllAuthTypes, AuthTypes } from '../../actions/authActions/authInterface';
import { AuthState } from './authTypes';
/* the state on app mount */
const intialState: AuthState = {
	token: null,
	firstName: null,
	lastName: null,
	email: null
};

/* the following actions trigger changes in the state */

export default (state = intialState, action: AllAuthTypes): AuthState => {
	switch (action.type) {
		case AuthTypes.LOGINSUCCESS:
			return { ...action.user };
		case AuthTypes.UPDATENAME:
			return { ...state, firstName: action.firstName, lastName: action.lastName };
		case AuthTypes.SETAUTHCOOKIE:
			return { ...action.user };
		case AuthTypes.LOGOUT:
			return intialState;
		default:
			return state;
	}
};
