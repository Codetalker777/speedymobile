import { AuthTypes, AllAuthTypes } from '../../actions/authActions/authInterface';
import {
	AccountTypes,
	AllAccountTypes
} from '../../actions/accountActions/accountInterface';
import { AccountState } from './accountTypes';
/* the state on app mount */
const intialState: AccountState = {
	address: null,
	birthDate: null,
	city: null,
	email: null,
	firstName: null,
	gender: null,
	lastName: null,
	postalCode: null,
	province: null,
	loading: true,
	modified: false
};

/* the following actions trigger changes in the state */

export default (
	state = intialState,
	action: AllAccountTypes | AllAuthTypes
): AccountState => {
	switch (action.type) {
		case AuthTypes.LOGOUT:
			return intialState;
		case AuthTypes.UPDATEACCOUNTSETTINGS:
			return { ...state, modified: false };
		case AccountTypes.MODIFYFIRSTNAME:
			return { ...state, modified: true, firstName: action.value };
		case AccountTypes.MODIFYADDRESS:
			return { ...state, modified: true, address: action.value };
		case AccountTypes.MODIFYBIRTHDATE:
			return { ...state, modified: true, birthDate: action.value };
		case AccountTypes.MODIFYCITY:
			return { ...state, modified: true, city: action.value };
		case AccountTypes.MODIFYEMAIL:
			return { ...state, modified: true, email: action.value };
		case AccountTypes.MODIFYGENDER:
			return { ...state, modified: true, gender: action.value };
		case AccountTypes.MODIFYLASTNAME:
			return { ...state, modified: true, lastName: action.value };
		case AccountTypes.MODIFYPOSTALCODE:
			return { ...state, modified: true, postalCode: action.value };
		case AccountTypes.MODIFYPROVINCE:
			return { ...state, modified: true, province: action.value };
		case AuthTypes.SETACCOUNTSETTINGS:
			return { ...state, loading: false, ...action.user };
		default:
			return state;
	}
};
